const details = [
  { title: "Role Title", value: "Software Engineer" },
  { title: "Role Level", value: "Expert level" },
];

export default function RoleDetails() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">Role Details</h2>
      {details.map((detail, index) => (
        <div className="flex items-center" key={index}>
          <label className="block mt-4 mb-2 font-semibold">{detail.title}</label>
          <span className="block mt-4 mb-2 px-4">{detail.value}</span>
        </div>
      ))}

      <div className="bg-white rounded-xl mt-12">
        <h2 className="border-b border-b-gray-300 text-xl">Role Capabilities</h2>
        <section className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-4 mt-4">
          <div className="border border-gray-100 bg-gray-50 p-5 rounded-lg">
            <h2 className="border-b border-gray-200">API Development</h2>
            <p className="mt-4">
              Develop and maintain RESTful APIs for the application.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
