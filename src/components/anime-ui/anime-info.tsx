import { GogoanimeInfo } from "@/utils/types";
import Image from "next/image";
import React from "react";

const AnimeInfoComponent = async ({
  animeInfo,
}: {
  animeInfo: GogoanimeInfo;
}) => {
  return (
    <main className=" w-full overflow-hidden">
      <div className="flex flex-col bg-base-200">
        {/* Hero Section */}
        <section className="flex flex-row items-center bg-base-300/50 p-1 ">
          <Image
            src={animeInfo.image ? animeInfo.image : "/placeholder.svg"}
            width={150}
            height={200}
            alt="Anime Poster"
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            className="rounded-l-md"
            quality={100}
          />
          <p className="text-xl md:text-2xl lg:text-3xl ml-2 font-semibold">
            {animeInfo.title}
          </p>
        </section>
      </div>

      <div role="tablist" className="tabs tabs-boxed w-full">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Info"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          <section>
            <h1 className="font-bold text-2xl">Description</h1>
            <p
              dangerouslySetInnerHTML={{ __html: `${animeInfo.description}` }}
            ></p>
          </section>
          <br />

          {/* <section>
            <Link
              href={`https://myanimelist.net/anime/${animeInfo.malId}`}
              target="_blank"
            >
              <p>
                MyAnimeList :{" "}
                <span className="text-warning">
                  {animeInfo.malId} - click here{" "}
                </span>
              </p>
            </Link>
          </section> */}

          {/* <section>
            <Link
              href={`https://anilist.co/anime/${animeInfo.id}`}
              target="_blank"
            >
              <p>
                Anilist :{" "}
                <span className="text-info">{animeInfo.id} - click here </span>
              </p>
            </Link>
          </section> */}

          {/* <p>
            Adult:{" "}
            {animeInfo.isAdult ? "true" : !animeInfo.isAdult ? "false" : "?"}
          </p> */}
          {/* <p>Country: {animeInfo.countryOfOrigin}</p> */}
          {/* <p>
            From{" "}
            {animeInfo.startDate ? (
              <span className="text-green-400">
                {animeInfo.startDate?.day}-{animeInfo.startDate?.month}-
                {animeInfo.startDate?.year}
              </span>
            ) : (
              "?"
            )}
            <span> to </span>
            {animeInfo.endDate ? (
              <span className="text-red-400">
                {animeInfo.endDate?.day}-{animeInfo.endDate?.month}-
                {animeInfo.endDate?.year}
              </span>
            ) : (
              "?"
            )}
          </p> */}
          <p>Total episodes: {animeInfo.totalEpisodes}</p>
          {/* <p>Rating: {animeInfo.rating! / 10}/10</p> */}
          {/* <p>Duration: {animeInfo.duration} minutes</p> */}
          <p>
            Genres:{" "}
            {animeInfo.genres?.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < animeInfo.genres?.length! - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <p>Status: {animeInfo.status}</p>
          {/* <p>
            Studios:{" "}
            {animeInfo.studios?.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < animeInfo.studios!.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p> */}
          <p>Type: {animeInfo.type}</p>
        </div>

        {/* <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Recommendations"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          {animeInfo.recommendations &&
          animeInfo.recommendations.length! > 0 ? (
            animeInfo.recommendations.slice(0, 10).map((item, index) => (
              <Link href={`/animes/${item.id}`} key={index}>
                <div className="flex flex-row items-center bg-base-200 mb-2 rounded-lg">
                  <Image
                    src={item.image ? item.image : "/placeholder.svg"}
                    width={80}
                    height={110}
                    alt="Anime Poster"
                    placeholder="blur"
                    blurDataURL="/placeholder.svg"
                    className="rounded-l-lg"
                  />
                  <section className="ml-2">
                    <p className="text-white">
                      {item.title?.english || item.title?.romaji}
                    </p>
                    <section className="text-sm flex flex-row items-center">
                      <p>{item.episodes} Episodes</p>
                      <span className="mx-1 font-bold">.</span>
                      <p>{item.type}</p>
                    </section>
                  </section>
                </div>
              </Link>
            ))
          ) : (
            <p>No recommendations found</p>
          )}
        </div> */}

        {/* <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Artworks"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          <div className="carousel carousel-center rounded-box">
            {animeInfo.artwork ? (
              animeInfo.artwork.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <Image
                    src={item.img ? item.img : "/placeholder.svg"}
                    width={400}
                    height={700}
                    className="w-auto h-44 md:h-48 lg:h-52 xl:h-72 mx-1 rounded-lg "
                    alt="Anime Artwork"
                    placeholder="blur"
                    loading="lazy"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                  />
                </div>
              ))
            ) : (
              <p>No artwork found</p>
            )}
          </div>
        </div> */}
      </div>
    </main>
  );
};
export default AnimeInfoComponent;
