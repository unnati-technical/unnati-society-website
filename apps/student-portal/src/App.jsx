export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-green-50">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🚧 Under Construction
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Student Portal
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          The student portal will empower Unnati students with access to courses, 
          quizzes, progress tracking, and digital certificates.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg w-full">
        {[
          { icon: '📚', label: 'Courses' },
          { icon: '📝', label: 'Quizzes' },
          { icon: '📈', label: 'Progress' },
          { icon: '🎓', label: 'Certificates' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white border border-green-200 rounded-xl p-4 text-center shadow-sm"
          >
            <span className="text-3xl block mb-2">{item.icon}</span>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
