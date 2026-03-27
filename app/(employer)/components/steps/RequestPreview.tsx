const details = [
  { title: "Role Title", value: "Software Engineer" },
  { title: "Role Level", value: "Expert level" },
];

export default function RequestPreview() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl font-bold">
        Request Preview
      </h2>
      {details.map((detail, index) => (
        <div className="flex items-center" key={index}>
          <label className="block mt-4 mb-2 font-semibold">{detail.title}</label>
          <span className="block mt-4 mb-2 px-4">{detail.value}</span>
        </div>
      ))}

      <section className="bg-white rounded-xl mt-12">
        <h2 className="border-b border-b-gray-300 text-xl font-bold">
          Request Settings
        </h2>
        <div className="mt-6 flex space-x-4">
          <div>
            <label
              htmlFor="submissionCap"
              className="text-sm font-medium text-gray-700"
            >
              Submission cap (required)
            </label>
            <input
              type="number"
              id="submissionCap"
              name="submissionCap"
              placeholder="Maximum submissions from candidates"
              className="border border-gray-300 rounded-lg p-2 w-full mt-2 bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="shortlistSize"
              className="text-sm font-medium text-gray-700"
            >
              Shortlist size (20 max)
            </label>
            <input
              type="number"
              id="shortlistSize"
              name="shortlistSize"
              placeholder="Total candidates to shortlist"
              className="border border-gray-300 rounded-lg p-2 w-full mt-2 bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="challengeDeadline"
            className="text-sm font-medium text-gray-700"
          >
            Challenge deadline
          </label>
          <input
            type="date"
            id="challengeDeadline"
            name="challengeDeadline"
            className="border border-gray-300 rounded-lg p-2 w-full mt-2 bg-gray-50"
          />
        </div>
      </section>
    </div>
  );
}
