import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    try {
      setLoading(true);
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setOutput(data.summary);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-2 ">
      <div className="flex flex-col w-full lg:w-1/2">
        <h1 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-700">
          Article summarizer
        </h1>
        <p className="text-gray-700 text-sm mb-4">Boilerplate for Nextjs, Co:here, TailwindCSS, Vercel</p>
        <textarea
          className="w-full h-64 text-sm p-4  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paste article here"
          value={input}
          onChange={(v) => setInput(v.target.value)}
        />
        <button
          onClick={handleClick}
          className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          {loading ? "loading..." : "Create TLDR"}
        </button>
        {output ? `TLDR: ${output}` : null}
      </div>
    </div>
  );
}
