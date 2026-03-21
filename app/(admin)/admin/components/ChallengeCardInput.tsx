"use client";

type Props = {
  id?: number;
  title: string;
  desc: string;
  req: string[];
};

export default function ChallengeCardInput({
  id = 0,
  title,
  desc,
  req,
}: Props) {
  return (
    <div className=" relative border rounded-2xl p-6 border-[#FF0046] cursor-pointer w-full">
      <h2 className="text-xl font-bold mt-4 whitespace-wrap">{title}</h2>
      <p className="text-gray-600 mt-2 whitespace-wrap">{desc}</p>

      <div className="gap-4 mt-4">
        <h1>Tests for</h1>
        <div className="flex flex-wrap">
          {req.map((t, i) => (
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
