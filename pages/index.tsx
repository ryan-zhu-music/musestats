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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getStats = () => {
    if (link == "" || !link.startsWith("https://musescore.com/")) {
      setError("Please enter a valid user link.");
      return;
    }
    setLoading(true);

    let stats: any = [];
    let page = 1;

    const request = () => {
      fetch("/api/getStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
          page: page,
        }),
      })
        .then((res) => {
          if (res.status == 200) {
            page++;
            res.json().then((data) => {
              stats.push(parseStatistics(data.response));
              request();
            });
          } else {
            setLoading(false);
            if (page == 1 && res.status == 404) {
              setError("User not found.");
              return;
            } else if (res.status == 400) {
              setError("Please enter a valid user link.");
              return;
            }
            setStatistics(mergeStats(stats));
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError("Something went wrong. Please try again later.");
          return;
        });
    };
    request();
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
        <title>MuseStats - Get Detailed MuseScore Statistics</title>
      </Head>
      <main className="scroll-smooth">
        <header className="relative w-screen h-screen">
          <div className="absolute z-0 w-96 h-96 md:w-[500px] md:h-[500px] bottom-10 -right-24 -rotate-6 bg-no-repeat bg-contain bg-center bg-[url('/music-note.svg')]" />
          <div className="absolute z-0 w-96 h-96 md:w-[500px] md:h-[500px] -top-16 -left-24 rotate-[190deg] bg-no-repeat bg-contain bg-center bg-[url('/music-note.svg')]" />
          <div className="relative z-50 w-full h-full flex flex-col items-center justify-center pt-10">
            <h1 className="text-4xl md:text-6xl lg:text-8xl">MUSESTATS</h1>
            <h2 className="mx-4 text-lg md:text-xl lg:text-2xl text-center font-semibold mt-3 text-dark-grey">
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
                      getStats();
                    }
                  }}
                />
                <button
                  className="w-14 text-3xl hover:w-20 duration-500 flex justify-center items-center rounded-r-full bg-[#7C75CF] text-white font-medium"
                  onClick={getStats}
                  name="Search"
                >
                  <MdPersonSearch />
                </button>
              </div>
              <p className="text-red-500 text-base md:text-md font-semibold mt-2 text-center">
                {error}
              </p>
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
          </div>
        </header>
        {loading && <Skeleton />}
        {statistics.user && !loading && <Results statistics={statistics} />}
      </main>
    </>
  );
}
