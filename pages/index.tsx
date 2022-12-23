import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");

  const getStats = () => {
    console.log("Getting stats for " + link);

    fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: link,
      }),
    }).then((res) => {
      res.json().then((data) => {
        let response = data.response.split('data-content="')[1];
        response = response.split("></div>")[0];
        response = response.trim();
        response = response.slice(0, -1);
        response = response.replaceAll("&quot;", '"');
        response = JSON.parse(response);
        console.log(response);
      });
    });
  };

  return (
    <>
      <Head>
        <title>MuseStats</title>
        <meta
          name="description"
          content="Get statistics for any MuseScore account!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">MuseStats</h1>
        <h2 className="text-2xl font-medium mt-4">
          Get statistics for any MuseScore account!
        </h2>
        <div>
          <p className="text-xl font-medium mt-8">
            Enter a valid MuseScore profile link.
          </p>
          <input
            type="text"
            placeholder="e.g. https://musescore.com/user/34214067"
            className="w-96 h-12 mt-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:italic"
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            className="w-96 h-12 mt-4 rounded-lg bg-blue-500 text-white font-medium"
            onClick={() => {
              if (link) {
                getStats();
              }
            }}
          >
            Get Stats
          </button>
        </div>
      </main>
    </>
  );
}
