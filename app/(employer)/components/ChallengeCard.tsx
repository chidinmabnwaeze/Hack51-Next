"use client";

type Props = {
  id?: number;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
};

export default function ChallengeCard({
  id = 0,
  isSelected = false,
  onSelect,
}: Props) {
  const data = {
    id,
    title: `Senior Backend Engineer (#${id})`,
    description:
      "A brief description of the challenge goes here. It should be concise and informative.",
    tests: ["Test A", "Test B", "Test C"],
  };

  return (
    <div
      onClick={() => onSelect?.(id)}
      className={`border rounded-2xl p-6 cursor-pointer ${
        isSelected ? "border-[#FF0046]" : "border-gray-300"
      }`}
    >
      <div className="relative">
        {isSelected && (
          <div className="bg-[#FF0046] border border-[#FF0046] text-white px-3 p-1 rounded-full w-2/6 flex justify-right">
            Selected
          </div>
        )}
        <h2 className="text-xl font-bold mt-4">{data.title}</h2>
        <p className="text-gray-600 mt-2">{data.description}</p>
      </div>
      <div className="gap-4 mt-4">
        <h1>Tests for</h1>
        <div className="flex flex-wrap">
          {data.tests.map((t, i) => (
            <span
              className="m-2 bg-[#ff0046]/40 text-black text-sm p-1 px-4 rounded-full"
              key={i}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
