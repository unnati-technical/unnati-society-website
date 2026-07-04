import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import { CheckCircle, XCircle, Award, User, Hash, Users, Calendar, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const VerificationPage = () => {
  const params = useParams();
  const wildcard = params['*'];
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        if (!wildcard) throw new Error("No certificate reference provided");
        // We use query parameter to safely pass slashes to the backend
        const data = await apiClient.get(`/api/certificates/verify?ref=${encodeURIComponent(wildcard)}`);
        setCert(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCert();
  }, [wildcard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium animate-pulse">Verifying Certificate Integrity...</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-red-100">
          <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-red-700 mb-1">Verification Failed</h1>
            <p className="text-red-500 text-sm">We could not find a valid certificate with the provided identifier.</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-600 text-sm mb-6">
              This certificate may be invalid, expired, or the URL might be incorrect. Please check the QR code or link again.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-400/10 rounded-full blur-[80px]" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Verification Status Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full shadow-lg shadow-green-600/20 mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Verified Certificate
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-bold shadow-sm">
            <CheckCircle className="w-4 h-4" />
            Authenticity Confirmed
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-xl bg-white/80">
          <div className="bg-[#0B1F5E] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4 relative z-10" />
            <h2 className="text-2xl font-bold text-white relative z-10 tracking-widest uppercase">
              {cert.appreciationType || 'OF APPRECIATION'}
            </h2>
          </div>

          <div className="p-8 sm:p-10">
            <div className="space-y-6">
              
              <div className="text-center pb-6 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Awarded To</p>
                <h3 className="text-2xl font-bold text-gray-900">{cert.recipientName}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                
                {cert.referenceNo && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                      <Hash className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Reference No.</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.referenceNo}</p>
                    </div>
                  </div>
                )}

                {cert.rollNo && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Roll Number</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.rollNo}</p>
                    </div>
                  </div>
                )}

                {cert.team && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Team / Role</p>
                      <p className="font-bold text-gray-900 mt-0.5">{cert.team}</p>
                    </div>
                  </div>
                )}

                {cert.issuedAt && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Issue Date</p>
                      <p className="font-bold text-gray-900 mt-0.5">
                        {format(new Date(cert.issuedAt), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              Verified by Unnati Society, IIIT Bhagalpur
            </p>
            <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
