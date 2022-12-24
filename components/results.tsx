import React from "react";
import Image from "next/image";
import { ImDownload } from "react-icons/im";

type Props = {
  statistics: any;
};

export default function Results({ statistics }: Props) {
  const file = new Blob([JSON.stringify(statistics)], {
    type: "application/json",
  });
  const fileURL = URL.createObjectURL(file);

  const handleDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `musestats-${statistics.user.username.replaceAll(
      " ",
      "-"
    )}.json`;
    a.click();
  };

  return (
    <main id="results" className="w-screen py-16 bg-white">
      <div className="lg:grid lg:grid-cols-2 px-5 md:px-16 lg:px-32 w-full h-full">
        <div className="w-full h-full flex flex-col items-stretch justify-start lg:pr-5">
          <div className="w-full gradient-purple p-1">
            <Image
              src={statistics.user.cover}
              alt={`Cover of ${statistics.user.username}`}
              width={800}
              height={200}
            />
          </div>
          <div className="flex flex-nowrap items-center justify-start my-5">
            <div className="gradient-purple p-1 rounded-full">
              <Image
                src={statistics.user.avatar}
                alt={`Avatar of ${statistics.user.username}`}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-start justify-end ml-5">
              <h3 className="text-3xl md:text-4xl">
                {statistics.user.username}
              </h3>
              <div className="flex flex-row items-center justify-start">
                {statistics.user.is_pro && (
                  <p className="flex flex-row items-center justify-center mr-2 px-3 py-1 text-dark-grey bg-emerald-400 font-bold text-xs rounded-full">
                    pro
                  </p>
                )}
                {statistics.user.is_moderator && (
                  <p className="flex flex-row items-center justify-center mr-2 px-3 py-1 text-dark-grey bg-slate-400 font-bold text-xs rounded-full">
                    moderator
                  </p>
                )}
                {statistics.user.is_staff && (
                  <p className="flex flex-row items-center justify-center mr-2 px-3 py-1 text-dark-grey bg-blue-400 font-bold text-xs rounded-full">
                    staff
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            className="w-full flex flex-row items-center justify-center font-bold text-base py-3 text-white duration-500 hover:opacity-60 gradient-purple"
            onClick={() => handleDownload(fileURL)}
          >
            Download as JSON
            <ImDownload className="ml-2" />
          </button>
          <div className="w-full h-full p-1 gradient-purple mt-4">
            <div className="h-full flex flex-col items-start justify-evenly bg-indigo-100 p-6">
              <h4 className="text-2xl mb-2">User</h4>
              <ul className="flex flex-col items-start justify-evenly">
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Name: </span>
                  {statistics.user.first_name + " " + statistics.user.last_name}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">ID: </span>
                  {statistics.user.id}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Country: </span>
                  {statistics.user.country_code}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Date created: </span>
                  {statistics.user.date_created}
                </li>
              </ul>
              <hr className="w-full my-2 h-[2px] bg-light-grey" />
              <ul className="flex flex-col items-start justify-evenly">
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Followers: </span>
                  {statistics.counters.followers}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Following: </span>
                  {statistics.counters.following}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Sets: </span>
                  {statistics.counters.sets}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Groups: </span>
                  {statistics.counters.groups}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 h-full lg:pl-5 lg:mt-0 mt-5">
          <div className="w-full p-1 gradient-red mb-5">
            <div className="h-full flex flex-col items-start justify-center bg-purple-50 p-6">
              <h4 className="text-2xl mb-2">Scores</h4>
              <ul className="flex flex-col items-start justify-center">
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Public: </span>
                  {statistics.counters.scores}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Original: </span>
                  {statistics.scores.original}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Public Domain: </span>
                  {statistics.scores.public_domain}
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-1 gradient-green mb-5">
            <div className="h-full flex flex-col items-start justify-center bg-blue-50 p-6">
              <h4 className="text-2xl mb-2">Totals</h4>
              <ul className="w-full grid grid-cols-2">
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Views:</span>{" "}
                  {statistics.scores.views}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Favourites:</span>{" "}
                  {statistics.scores.favourites}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Comments:</span>{" "}
                  {statistics.scores.comments}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Duration:</span>{" "}
                  {statistics.scores.duration}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Pages:</span>{" "}
                  {statistics.scores.pages}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Votes:</span>{" "}
                  {statistics.scores.votes}
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-1 gradient-blue">
            <div className="h-full flex flex-col items-start justify-center bg-blue-50 p-6">
              <h4 className="text-2xl mb-2">Average per score</h4>
              <ul className="grid grid-cols-2 w-full">
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Views:</span>{" "}
                  {statistics.average.views}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Favourites:</span>{" "}
                  {statistics.average.favourites}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Comments:</span>{" "}
                  {statistics.average.comments}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Duration:</span>{" "}
                  {statistics.average.duration}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Pages:</span>{" "}
                  {statistics.average.pages}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Votes:</span>{" "}
                  {statistics.average.votes}
                </li>
                <li className="text-base text-dark-grey mb-1">
                  <span className="font-bold">Rating:</span>{" "}
                  {statistics.average.rating}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
