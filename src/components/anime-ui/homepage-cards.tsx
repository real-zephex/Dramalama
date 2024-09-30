import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

import { GogoanimeSearch } from "@/utils/types";

const AnimeHomepageCards = async ({ data }: { data: GogoanimeSearch }) => {
  return (
    <main>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-2">
        {data.results?.map((item) => (
          <Link
            key={item.id}
            href={`/animes/${item.id}`}
            className="relative bg-muted rounded-lg  group bg-base-300 shadow-md"
          >
            <Image
              src={
                item.image
                  ? `${process.env.NEXT_PUBLIC_PROXY_2 as string}${item.image}`
                  : "/placeholder.svg"
              }
              alt={`Anime ${item.id}`}
              width={500}
              height={700}
              className="w-full h-auto md:h-80 object-center  group-hover:opacity-80 transition-opacity rounded-t-md"
              quality={100}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
            {/* <div className="absolute top-0 right-0 p-2 bg-neutral-800/90 rounded-bl-xl rounded-tr-md">
              {item.rating && (
                <div className="flex flex-row items-center">
                  <FaStar className="w-4 h-4 mr-1 text-yellow-300" />
                  <span>{item.rating! / 10}</span>
                </div>
              )}
            </div> */}
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2">
                {item.title ||
                  item.id?.replaceAll("-", " ").toLocaleUpperCase()}
              </h3>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-black/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-80 h-full flex justify-center items-center">
              <FaPlay size={30} className="-translate-y-5" />
            </div>

            {/* <div className="absolute bottom-0 left-0 translate-x-[35%] translate-y-[70%] right-0 bg-zinc-900 text-white p-4 hidden transition-opacity duration-300 group-hover:2xl:flex z-10 overflow-auto rounded-xl flex-col w-80 h-96 ">
              <div className="flex flex-row items-center my-2 bg-base-200 rounded-lg">
                <Image
                  src={item.image!}
                  width={80}
                  height={120}
                  alt="Anime poster"
                  className="rounded-l-lg"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                />
                <h1 className="font-bold text-primary text-xl ml-1  ">
                  {item.title?.english || item.title?.romaji}
                </h1>
              </div>
              <div className="flex flex-row items-center">
                {item.totalEpisodes && (
                  <div className="badge badge-outline badge-md badge-accent">
                    {item.totalEpisodes?.toString()} episodes
                  </div>
                )}
              </div>
              {item.description && (
                <p
                  className="line-clamp-7 text-sm mt-2 overflow-auto shadow-lg shadow-base-200 drop-shadow-xl rounded-lg"
                  dangerouslySetInnerHTML={{ __html: `${item.description}` }}
                ></p>
              )}
              {item.genres && (
                <p className="mt-1 text-gray-400 font-semibold">
                  Genres:{" "}
                  {item.genres &&
                    item.genres.map((items, index) => (
                      <React.Fragment key={index}>
                        <span className="text-neutral-500 font-normal">
                          {items}
                        </span>
                        {index < item.genres!.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                </p>
              )}
              {item.status && (
                <p className="text-gray-400 font-semibold">
                  Status:{" "}
                  <span className="text-neutral-500 font-normal">
                    {item.status}
                  </span>
                </p>
              )}
            </div> */}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AnimeHomepageCards;
