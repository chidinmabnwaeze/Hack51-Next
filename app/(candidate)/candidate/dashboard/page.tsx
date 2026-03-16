export default function CandidateDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Active Applications
          </h3>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Challenges Completed
          </h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Profile Score
          </h3>
          <p className="text-3xl font-bold">85%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Available Opportunities</h2>
        <p className="text-gray-600">
          Browse and apply to challenges from employers...
        </p>
      </div>
    </div>
  );
}
