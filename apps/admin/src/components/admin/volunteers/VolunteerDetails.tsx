import React, { useState } from 'react';
import { ArrowLeft, Download, ChevronDown, Mail, Phone, MapPin, Link, CheckCircle, XCircle, Heart, ExternalLink, FileText, Globe, Briefcase, Award } from 'lucide-react';
import { Volunteer } from '../../../store/useVolunteerStore';
import { motion, AnimatePresence } from 'framer-motion';
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

const TABS = ['Application Details', 'Form Responses', 'Documents (3)', 'Notes (2)', 'Activity Log'];

export const VolunteerDetails: React.FC<VolunteerDetailsProps> = ({ volunteer, onBack }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row overflow-hidden">
      {/* Left Profile Sidebar */}
      <div className="w-full md:w-[320px] shrink-0 border-r border-gray-100 p-8 flex flex-col items-center">
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

        <h2 className="text-xl font-bold text-gray-900 mb-2">{volunteer.name}</h2>
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
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span>{volunteer.preferredLocation}</span>
          </div>
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
      <div className="flex-1 flex flex-col p-8">
        
        {/* Header Area */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900">Volunteer Details</h2>
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

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-semibold whitespace-nowrap transition-colors relative",
                activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Application Details' && (
          <div className="flex-1 overflow-y-auto pr-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
              <DetailRow label="Full Name" value={volunteer.name} />
              <DetailRow label="Program Interested In" value={volunteer.program} />
              <DetailRow label="Date of Birth" value={volunteer.dob} />
              <DetailRow label="Role Applied For" value={volunteer.role} />
              <DetailRow label="Gender" value={volunteer.gender} />
              <DetailRow label="Availability" value={volunteer.availability} />
              <DetailRow label="Education" value={volunteer.education} />
              <DetailRow label="Preferred Mode" value={volunteer.preferredMode} />
              <DetailRow label="College / University" value={volunteer.college} />
              <DetailRow label="Preferred Location" value={volunteer.preferredLocation} />
              <DetailRow label="Current Year" value={volunteer.currentYear} />
              <DetailRow label="How did you hear about us?" value={volunteer.howDidYouHear} />
              <DetailRow label="Address" value={volunteer.address} />
            </div>

            {/* Availability & Commitment */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Availability & Commitment</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500 mb-1">Availability</span>
                  <span className="font-semibold text-gray-900">{volunteer.availability || 'Not specified'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Preferred Mode</span>
                  <span className="font-semibold text-gray-900">{volunteer.preferredMode || 'Online'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Hours Per Week</span>
                  <span className="font-semibold text-gray-900">{volunteer.hoursPerWeek || 'Not specified'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Start Date</span>
                  <span className="font-semibold text-gray-900">{volunteer.startDate || 'Immediate'}</span>
                </div>
              </div>
            </div>
              
            <div className="space-y-6">
                {/* NGO Experience */}
                {volunteer.hasNgoExperience === 'yes' && (
                  <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                    <h3 className="text-sm font-bold text-orange-900 mb-3 flex items-center gap-2">
                      <Briefcase size={16} className="text-orange-600" /> Previous NGO Experience
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-orange-700/70 mb-1 text-xs font-semibold">NGO Name</span>
                        <span className="font-bold text-orange-900">{volunteer.ngoName || 'N/A'}</span>
                      </div>
                      {volunteer.experienceDesc && (
                        <div>
                          <span className="block text-orange-700/70 mb-1 text-xs font-semibold">Experience Details</span>
                          <p className="text-orange-900 font-medium leading-relaxed">{volunteer.experienceDesc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Motivation & Goals */}
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Heart size={16} className="text-blue-600" /> Motivation
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed font-medium mb-4">
                    {volunteer.whyVolunteer || "No motivation provided."}
                  </p>
                  
                  {volunteer.careerGoals && (
                    <>
                      <h3 className="text-sm font-bold text-blue-900 mb-2 mt-4 border-t border-blue-200 pt-3 flex items-center gap-2">
                        <Award size={16} className="text-blue-600" /> Career Goals
                      </h3>
                      <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        {volunteer.careerGoals}
                      </p>
                    </>
                  )}
                </div>

                {/* Documents & Links */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={16} className="text-gray-500" /> Documents & Links
                  </h3>
                  <div className="space-y-3">
                    {volunteer.resumeUrl ? (
                      <a href={volunteer.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Resume / CV</h4>
                          <p className="text-xs font-medium text-blue-600/70">Click to view document</p>
                        </div>
                        <ExternalLink size={16} className="text-blue-400 group-hover:text-blue-600" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <FileText size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-500">Resume / CV</h4>
                          <p className="text-xs font-medium text-gray-400">Not provided</p>
                        </div>
                      </div>
                    )}

                    {volunteer.linkedinUrl && (
                      <a href={volunteer.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-2">
                          <Link size={16} className="text-[#0A66C2]" />
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">LinkedIn Profile</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600" />
                      </a>
                    )}

                    {volunteer.portfolioUrl && (
                      <a href={volunteer.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-gray-500 group-hover:text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Portfolio Website</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                {(volunteer.emergencyName || volunteer.emergencyPhone) && (
                  <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                    <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                      <Phone size={16} className="text-red-600" /> Emergency Contact
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center border-b border-red-100 pb-2">
                        <span className="text-red-700/70 font-medium text-xs">Name</span>
                        <span className="font-bold text-red-900">{volunteer.emergencyName || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-red-700/70 font-medium text-xs">Phone</span>
                        <span className="font-bold text-red-900">{volunteer.emergencyPhone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="mb-8 border-t border-gray-100 pt-8 mt-8">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {volunteer.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between border-b border-gray-50 pb-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-left md:text-right">{value}</span>
    </div>
  );
}
