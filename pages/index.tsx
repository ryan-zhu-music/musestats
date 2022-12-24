import Head from "next/head";
import { MdPersonSearch } from "react-icons/md";
import { useState } from "react";
import { parseStatistics } from "../utils/parser";
import { mergeStats } from "../utils/mergeStats";
import Results from "../components/results";

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
      <header className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl">MUSESTATS</h1>
        <h2 className="text-2xl font-semibold mt-3 text-dark-grey">
          Get statistics for any MuseScore account!
        </h2>
        <div className="w-[550px] h-14 mt-5 rounded-full gradient-purple p-[3px]">
          <div className="w-full h-full rounded-full flex items-stretch justify-between flex-nowrap">
            <input
              type="text"
              placeholder="e.g. https://musescore.com/user/34214067"
              className="w-full text-dark-grey placeholder:text-light-grey rounded-l-full pl-4 font-normal focus:outline-none placeholder:italic bg-white"
              onChange={(e) =>
                setLink(
                  e.target.value + (e.target.value.slice(-1) == "/" ? "" : "/")
                )
              }
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  if (link) {
                    getStats();
                  }
                }
              }}
            />
            <button
              className="w-14 text-2xl hover:text-3xl hover:w-16 duration-500 flex justify-center items-center rounded-r-full bg-[#7C75CF] text-white font-medium"
              onClick={() => {
                if (link) {
                  getStats();
                }
              }}
            >
              <MdPersonSearch />
            </button>
          </div>
        </div>
      </header>
      {statistics.user && <Results statistics={statistics} />}
    </>
  );
}
