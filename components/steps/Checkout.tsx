const pricing = [
  { title: "Admin Setup Fee (Fixed)", value: "₦50,000" },
  {
    title: "Verification cost per candidate (3 x 64,000 per candidate)",
    value: "₦192,000",
  },
];

export default function Checkout() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full mt-10 md:w-3/4 mx-auto">
      <h2 className="border-b border-b-gray-300 text-xl font-bold">Checkout</h2>
      {pricing.map((item, index) => (
        <div className="flex items-center justify-between" key={index}>
          <label className="block mt-4 mb-2 font-semibold">{item.title}</label>
          <span className="block mt-4 mb-2 px-4">{item.value}</span>
        </div>
      ))}

      <section className="bg-white rounded-xl mt-12">
        <h2 className="border-b border-b-gray-300 text-xl font-bold">
          Total Cost
        </h2>
        <div className="bg-[#FF0046] rounded-lg mt-4 p-4 w-full md:w-1/2 text-white">
          <span className="block mt-4 mb-2 px-4 text-2xl font-bold">
            {`₦${pricing
              .reduce(
                (acc, item) =>
                  acc +
                  parseInt(item.value.replace("₦", "").replace(",", "")),
                0
              )
              .toLocaleString()}`}
          </span>
        </div>
      </section>
    </div>
  );
}
