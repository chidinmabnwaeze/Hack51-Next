export default function RubricEditor() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl">Rubric Editor</h2>
      <section className="bg-gray-100 p-5 rounded-xl mt-12">
        <div className="flex">
          <h2>Scoring Weight % :</h2>
          <span className="text-green-500">50%</span>
        </div>
        <div className="border border-gray-100 bg-white p-2 mt-2 rounded-lg">
          <p className="font-bold">Criteria 1: Code Functionality</p>
        </div>
        <div className="border border-gray-100 bg-white p-2 mt-2 rounded-lg">
          <p className="mt-2">
            This criterion evaluates whether the submitted code meets the
            specified requirements and functions correctly.
          </p>
        </div>
      </section>
    </div>
  );
}
