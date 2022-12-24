import Head from "next/head";
import { useState } from "react";
import { parseStatistics } from "../utils/parser";
import { mergeStats } from "../utils/mergeStats";

export default function Home() {
  const [link, setLink] = useState("");
  const [statistics, setStatistics] = useState<any>({});

  const getStats = () => {
    let stats: any = [];
    let page = 1;

    const request = (new_link: string) => {
      fetch("/api/getStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: new_link,
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            page++;
            res.json().then((data) => {
              stats.push(parseStatistics(data.response));
              request(link + "sheetmusic/?page=" + String(page));
            });
          } else {
            setStatistics(mergeStats(stats));
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    request(link + "sheetmusic/?page=" + String(page));
  };

  console.log(statistics);

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
        <div className="flex items-center justify-center flex-col">
          <p className="text-xl font-medium mt-8">
            Enter a valid MuseScore profile link.
          </p>
          <input
            type="text"
            placeholder="e.g. https://musescore.com/user/34214067"
            className="w-96 h-12 mt-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:italic"
            onChange={(e) =>
              setLink(
                e.target.value + (e.target.value.slice(-1) == "/" ? "" : "/")
              )
            }
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
