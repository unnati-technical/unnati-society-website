import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import { queryKeys } from '../constants/queryKeys';

export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: async () => {
      const res = await eventsApi.getAll();
      return res || [];
    }
  });
};
