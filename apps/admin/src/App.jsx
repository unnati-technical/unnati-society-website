export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 text-violet-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🚧 Under Construction
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Unnati Admin
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          The admin dashboard is being built. It will include volunteer management, 
          event management, donations, school management, reports, and analytics.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-2xl w-full">
        {[
          { icon: '👥', label: 'Volunteer Management' },
          { icon: '🎉', label: 'Event Management' },
          { icon: '💰', label: 'Donation Tracking' },
          { icon: '🏫', label: 'School Management' },
          { icon: '📊', label: 'Analytics' },
          { icon: '📋', label: 'Reports' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center opacity-60"
          >
            <span className="text-3xl block mb-2">{item.icon}</span>
            <p className="text-sm text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
