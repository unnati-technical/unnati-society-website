import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import { queryKeys } from '../constants/queryKeys';
import { toast } from 'sonner';

export const useCreateEvent = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: any) => {
      const cleanForm = {
        title: form.title,
        description: form.description || '',
        date: new Date(form.date).toISOString(),
        location: form.location || '',
        link: form.link || null,
        color: form.color || null,
        photos: form.photos || [],
        eventType: form.eventType || 'AUTO',
      };
      return eventsApi.create(cleanForm);
    },
    onMutate: async (newForm: any) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.events });
      const previousEvents = queryClient.getQueryData(queryKeys.events);
      const tempId = `temp-${Date.now()}`;
      queryClient.setQueryData(queryKeys.events, (old: any) => {
        if (!old) return old;
        return [{ id: tempId, ...newForm, date: new Date(newForm.date).toISOString() }, ...old];
      });
      return { previousEvents };
    },
    onSuccess: () => {
      toast.success('Event created!');
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err, newEvent, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(queryKeys.events, context.previousEvents);
      }
      toast.error('Failed to create event');
    }
  });
};

export const useUpdateEvent = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string, form: any }) => {
      const cleanForm = {
        title: form.title,
        description: form.description || '',
        date: new Date(form.date).toISOString(),
        location: form.location || '',
        link: form.link || null,
        color: form.color || null,
        photos: form.photos || [],
        eventType: form.eventType || 'AUTO',
      };
      return eventsApi.update(id, cleanForm);
    },
    onMutate: async ({ id, form }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.events });
      const previousEvents = queryClient.getQueryData(queryKeys.events);
      queryClient.setQueryData(queryKeys.events, (old: any) => {
        if (!old) return old;
        return old.map((event: any) => event.id === id ? { ...event, ...form, date: new Date(form.date).toISOString() } : event);
      });
      return { previousEvents };
    },
    onSuccess: () => {
      toast.success('Event updated!');
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err, variables, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(queryKeys.events, context.previousEvents);
      }
      toast.error('Failed to update event');
    }
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventsApi.delete(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.events });
      const previousEvents = queryClient.getQueryData(queryKeys.events);
      queryClient.setQueryData(queryKeys.events, (old: any) => {
        if (!old) return old;
        return old.filter((event: any) => event.id !== id);
      });
      return { previousEvents };
    },
    onSuccess: () => {
      toast.success('Event deleted');
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
    },
    onError: (err, id, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(queryKeys.events, context.previousEvents);
      }
      toast.error('Failed to delete event');
    }
  });
};
