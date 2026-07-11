import React, { useState } from 'react';
import { ArrowLeft, Download, ChevronDown, Mail, Phone, MapPin, Link, FileText, Briefcase, Heart, ExternalLink, User, Compass } from 'lucide-react';
import { Volunteer } from '../../../store/useVolunteerStore';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { volunteersApi } from '../../../api/volunteers.api';
import { queryKeys } from '../../../constants/queryKeys';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface VolunteerDetailsProps {
  volunteer: Volunteer;
  onBack: () => void;
}

export const VolunteerDetails: React.FC<VolunteerDetailsProps> = ({ volunteer, onBack }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => volunteersApi.updateStatus(id, { status }),
    onMutate: async ({ id, status }) => {
      setShowDropdown(false);
      await queryClient.cancelQueries({ queryKey: queryKeys.volunteers });
      const previousVolunteers = queryClient.getQueryData(queryKeys.volunteers);
      queryClient.setQueryData(queryKeys.volunteers, (old: any) => {
        if (!old) return old;
        if (Array.isArray(old)) {
          return old.map((v: any) => v.id === id ? { ...v, status } : v);
        }
        if (old.data) {
          return { ...old, data: old.data.map((v: any) => v.id === id ? { ...v, status } : v) };
        }
        return old;
      });
      return { previousVolunteers };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKeys.volunteers, context?.previousVolunteers);
      toast.error('Failed to update volunteer status');
    },
    onSuccess: (data, variables) => {
      toast.success(`Volunteer status updated to ${variables.status}`);
      queryClient.invalidateQueries({ queryKey: queryKeys.volunteers });
    }
  });

  const handleUpdateStatus = (status: string) => {
    updateStatusMutation.mutate({ id: volunteer.id, status });
  };

  // Helper to calculate age from birth year (dob)
  const calculatedAge = React.useMemo(() => {
    if (!volunteer.dob) return null;
    const year = parseInt(volunteer.dob);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) return null;
    return new Date().getFullYear() - year;
  }, [volunteer.dob]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row overflow-hidden">
      {/* Left Profile Sidebar */}
      <div className="w-full md:w-[320px] shrink-0 bg-gray-50/50 border-r border-gray-150 p-8 flex flex-col items-center">
        <div className="w-full flex justify-start mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Back to List
          </button>
        </div>

        <img 
          src={volunteer.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}`} 
          alt={volunteer.name}
          className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-sm mb-4"
        />

        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">{volunteer.name}</h2>
        <div className="px-3 py-1 bg-yellow-50 text-yellow-800 text-xs font-bold rounded-lg mb-3 border border-yellow-100">
          {volunteer.volunteerId}
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold mb-8 border",
          volunteer.status === 'Pending' && "bg-yellow-50 text-yellow-700 border-yellow-200",
          volunteer.status === 'Approved' && "bg-emerald-50 text-emerald-700 border-emerald-200",
          volunteer.status === 'Rejected' && "bg-red-50 text-red-700 border-red-200",
          volunteer.status === 'Under Review' && "bg-blue-50 text-blue-700 border-blue-200"
        )}>
          {volunteer.status}
        </span>

        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={16} className="text-gray-400" />
            <span className="truncate">{volunteer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone size={16} className="text-gray-400" />
            <span>{volunteer.phone}</span>
          </div>
          {volunteer.preferredLocation && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{volunteer.preferredLocation}</span>
            </div>
          )}
          {volunteer.linkedinUrl && (
            <div className="flex items-center gap-3 text-sm text-blue-600">
              <Link size={16} />
              <a href={volunteer.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline font-medium">LinkedIn Profile</a>
            </div>
          )}
        </div>

        <div className="w-full mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Applied on</p>
          <p className="text-sm font-medium text-gray-900">{volunteer.appliedDate}</p>
        </div>
      </div>

      {/* Right Details Area */}
      <div className="flex-1 flex flex-col p-8 bg-gray-50/10">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
            <p className="text-sm text-gray-500 mt-0.5">Submitted volunteer registration overview</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={16} /> Download Application
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Take Action <ChevronDown size={16} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1">
                  <button onClick={() => handleUpdateStatus('Approved')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Approve</button>
                  <button onClick={() => handleUpdateStatus('Rejected')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Reject</button>
                  <button onClick={() => handleUpdateStatus('Under Review')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Schedule Interview</button>
                  <button onClick={() => handleUpdateStatus('Request Changes')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Request Changes</button>
                  <button onClick={() => handleUpdateStatus('Assigned Coordinator')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Assign Coordinator</button>
                  <button onClick={() => handleUpdateStatus('Waitlist')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Move to Waitlist</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section List */}
        <div className="space-y-8 flex-1 overflow-y-auto">
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
              <User size={18} className="text-blue-500" /> 1. Personal Information
            </h3>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-gray-900">{volunteer.name}</p>
                </div>
                {calculatedAge !== null && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Age</p>
                    <p className="text-sm font-semibold text-gray-900">{calculatedAge} years</p>
                  </div>
                )}
                {volunteer.gender && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Gender</p>
                    <p className="text-sm font-semibold text-gray-900">{volunteer.gender}</p>
                  </div>
                )}
                {volunteer.preferredLocation && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current City</p>
                    <p className="text-sm font-semibold text-gray-900">{volunteer.preferredLocation}</p>
                  </div>
                )}
                {volunteer.college && (
                  <div className="md:col-span-2">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">College / Organization</p>
                    <p className="text-sm font-semibold text-gray-900">{volunteer.college}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Preferences & Commitment */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
              <Compass size={18} className="text-indigo-500" /> 2. Volunteer Preferences
            </h3>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {volunteer.availability && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Availability</p>
                    <p className="text-sm font-semibold text-gray-900">{volunteer.availability}</p>
                  </div>
                )}
                {volunteer.hoursPerWeek && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hours Per Week</p>
                    <p className="text-sm font-semibold text-gray-900">{volunteer.hoursPerWeek} Hours</p>
                  </div>
                )}
              </div>

              {/* Areas of Interest (Checkbox tags) */}
              {volunteer.interests && volunteer.interests.length > 0 && (
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Areas of Interest</p>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.interests.map((interest) => (
                      <span 
                        key={interest} 
                        className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: NGO Experience */}
          {volunteer.hasNgoExperience === 'yes' && (
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
                <Briefcase size={18} className="text-orange-500" /> 3. Previous NGO Experience
              </h3>
              <div className="bg-orange-50/20 rounded-[16px] p-6 border border-orange-100 shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  {volunteer.ngoName && (
                    <div>
                      <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">Organization Name</p>
                      <p className="text-sm font-bold text-orange-950">{volunteer.ngoName}</p>
                    </div>
                  )}
                  {volunteer.experienceDesc && (
                    <div className="mt-2">
                      <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">Experience Description</p>
                      <p className="text-sm font-medium text-orange-900/90 leading-relaxed bg-white p-4 rounded-xl border border-orange-50">{volunteer.experienceDesc}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Motivation & Contributable Skills */}
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
              <Heart size={18} className="text-rose-500" /> 4. Motivation & Skills
            </h3>
            <div className="space-y-6">
              {volunteer.whyVolunteer && (
                <div className="bg-blue-50/20 rounded-[16px] p-6 border border-blue-100 shadow-sm">
                  <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-2">Why do you want to join Unnati Society?</p>
                  <p className="text-sm font-medium text-blue-950 leading-relaxed">{volunteer.whyVolunteer}</p>
                </div>
              )}

              {/* Skills Tags */}
              {volunteer.skills && volunteer.skills.length > 0 && (
                <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contributable Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Documents & Files */}
          {volunteer.resumeUrl && (
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
                <FileText size={18} className="text-emerald-500" /> 5. Documents & Attachments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={volunteer.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-4 rounded-2xl border border-emerald-100 bg-emerald-50/10 hover:bg-emerald-50/20 hover:border-emerald-250 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/55 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-all">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Resume / CV</h4>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">Click to view document</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

