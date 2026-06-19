import React from 'react';

const messagesData = [
  {
    sender: 'Sultanganj Inter College',
    message: 'Thank you for such an informative session for our students.',
    time: '10:30 AM',
    unread: true,
    initials: 'SI',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    sender: 'Kahalgaon High School',
    message: 'Looking forward to more workshops with Unnati Society.',
    time: 'Yesterday',
    unread: true,
    initials: 'KH',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    sender: 'Jagdishpur High School',
    message: 'Students really enjoyed the digital literacy program.',
    time: 'May 10',
    unread: false,
    initials: 'JH',
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    sender: 'Ritika (Volunteer)',
    message: 'Resources for the upcoming session uploaded.',
    time: 'May 10',
    unread: true,
    initials: 'RV',
    color: 'bg-purple-100 text-purple-700',
    image: 'https://i.pravatar.cc/150?img=1'
  }
];

const RecentMessages = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-[#0F172A]">Recent Messages</h2>
        <a href="#" className="text-xs font-bold text-[#2563EB] hover:underline">View All</a>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {messagesData.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent transition-colors cursor-pointer group">
            {msg.image ? (
              <img src={msg.image} alt={msg.sender} className="w-10 h-10 rounded-full border border-gray-200 shrink-0" />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.color}`}>
                {msg.initials}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className={`text-sm truncate ${msg.unread ? 'font-extrabold text-[#0F172A]' : 'font-bold text-gray-700'}`}>
                  {msg.sender}
                </h4>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold text-gray-400">{msg.time}</span>
                  {msg.unread && <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>}
                </div>
              </div>
              <p className={`text-xs truncate ${msg.unread ? 'font-semibold text-gray-700' : 'text-gray-500 font-medium'}`}>
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
