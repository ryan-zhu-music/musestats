import Head from "next/head";
import { MdPersonSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { parseStatistics } from "../utils/parser";
import { mergeStats } from "../utils/mergeStats";
import Results from "../components/results";
import Skeleton from "../components/skeleton";

export default function Home() {
  const [link, setLink] = useState("");
  const [statistics, setStatistics] = useState<any>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyLink = () => {
    if (link && link.startsWith("https://musescore.com/")) {
      setError(false);
      getStats();
    } else {
      setError(true);
    }
  };

  const getStats = () => {
    setLoading(true);

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
            setLoading(false);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    request(link + "sheetmusic/?page=" + String(page));
  };

  useEffect(() => {
    if (loading) {
      const a = document.createElement("a");
      a.href = "#results";
      a.click();
    }
  }, [loading]);

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
      <main className="scroll-smooth">
        <header className="w-screen h-screen flex flex-col items-center justify-center pt-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl">MUSESTATS</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center font-semibold mt-3 text-dark-grey">
            Get statistics for any MuseScore account!
          </h2>
          <div className="w-5/6 md:w-[550px] h-14 mt-5 rounded-full gradient-purple p-[3px]">
            <div className="w-full h-full rounded-full flex items-stretch justify-between flex-nowrap">
              <input
                type="text"
                placeholder="e.g. https://musescore.com/user/34214067"
                className="w-full text-dark-grey placeholder:text-light-grey rounded-l-full pl-4 font-normal focus:outline-none placeholder:italic bg-indigo-100 focus:bg-white hover:bg-white duration-500"
                onChange={(e) =>
                  setLink(
                    e.target.value.trim() +
                      (e.target.value.slice(-1) == "/" ? "" : "/")
                  )
                }
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    verifyLink();
                  }
                }}
              />
              <button
                className="w-14 text-3xl hover:w-20 duration-500 flex justify-center items-center rounded-r-full bg-[#7C75CF] text-white font-medium"
                onClick={verifyLink}
              >
                <MdPersonSearch />
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-base md:text-md font-semibold mt-2 text-center">
                Please enter a valid user link.
              </p>
            )}
          </div>
          <div className="justify-self-end flex flex-col items-center justify-center mt-10">
            <p className="text-dark-grey text-base md:text-md">
              View{" "}
              <a
                href="https://github.com/ryan-zhu-music/musestats"
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold underline hover:text-indigo-600/50 duration-500"
              >
                GitHub repo
              </a>
            </p>
            <p className="text-dark-grey text-base md:text-md">
              Made with Next.js by{" "}
              <a
                href="https://www.ryanzhu.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-bold underline hover:text-indigo-600/50 duration-500"
              >
                Ryan Zhu
              </a>
            </p>
            <p className="text-xs md:text-sm text-light-grey mt-10 text-center">
              No results/data are collected.
            </p>
            <p className="text-xs md:text-sm text-light-grey text-center mt-2">
              This website is not affiliated with MuseScore.
            </p>
          </div>
        </header>
        {loading && <Skeleton />}
        {statistics.user && !loading && <Results statistics={statistics} />}
      </main>
    </>
  );
}
