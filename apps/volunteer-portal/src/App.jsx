export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🚧 Under Construction
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Volunteer Portal
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          The volunteer portal will allow volunteers to track attendance, manage assigned 
          schools, complete tasks, and download certificates.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg w-full">
        {[
          { icon: '📅', label: 'Attendance Tracking' },
          { icon: '🏫', label: 'Assigned Schools' },
          { icon: '✅', label: 'Task Management' },
          { icon: '🏆', label: 'Certificates' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"
          >
            <span className="text-3xl block mb-2">{item.icon}</span>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
