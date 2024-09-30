import { TVInfo, TVCredits, TVImages } from "@/utils/types";
import { FaStar } from "react-icons/fa";

import Image from "next/image";

const SeriesInfoTabs = async ({
  data,
  credits,
  artwork,
}: {
  data: TVInfo;
  credits: TVCredits;
  artwork: TVImages;
}) => {
  return (
    <main>
      <div role="tablist" className="tabs tabs-boxed rounded-none ">
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
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{data.overview}</p>
          </section>

          <section className="mt-4">
            <p>
              <strong>Number of Seasons:</strong> {data.number_of_seasons}
            </p>
            <p>
              <strong>Number of Episodes:</strong> {data.number_of_episodes}
            </p>
            <p>
              <strong>Status:</strong> {data.status}
            </p>
            <p className="flex flex-row">
              <strong>Vote Average:</strong>
              <span className="flex flex-row items-center ml-1">
                {data.vote_average?.toString()}{" "}
                <FaStar className="ml-1 text-yellow-500" />
              </span>
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {data.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Networks</strong>:{" "}
              {data.networks?.map((item) => item.name).join(", ")}
            </p>
            <p>
              Aired from {data.first_air_date?.toString()} to{" "}
              {data.last_air_date?.toString()}
            </p>
          </section>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Cast"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          <div className="rounded-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {credits.cast && credits.cast.length > 0 ? (
              credits.cast.map((item, index) => (
                <div
                  className="flex flex-row items-center bg-base-200 rounded-md transition-colors hover:bg-base-300 cursor-pointer"
                  key={index}
                >
                  <Image
                    src={
                      item.profile_path
                        ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.profile_path}`
                        : "/placeholder.svg"
                    }
                    width={150}
                    height={200}
                    className="w-auto h-32 mx-1 rounded-l-md "
                    alt="Series Credit"
                    placeholder="blur"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p>Played {item.character}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No cast info found</p>
            )}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Artworks"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2 overflow-hidden"
        >
          <p className="text-xl md:text-2xl p-1 font-semibold">Backdrops</p>
          <div className="carousel rounded-box w-full">
            {artwork.backdrops ? (
              artwork.backdrops.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <Image
                    src={
                      item.file_path
                        ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.file_path}`
                        : "/placeholder.svg"
                    }
                    width={500}
                    height={200}
                    className="w-auto h-44 md:h-48 lg:h-52 xl:h-72 mx-1 rounded-lg "
                    alt="Anime Artwork"
                    unoptimized
                    placeholder="blur"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p>No artwork found</p>
            )}
          </div>

          <p className="text-xl md:text-2xl p-1 font-semibold">Posters</p>
          <div className="carousel rounded-box w-full">
            {artwork.posters ? (
              artwork.posters.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <Image
                    src={
                      item.file_path
                        ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.file_path}`
                        : "/placeholder.svg"
                    }
                    width={500}
                    height={200}
                    className="w-auto h-44 md:h-48 lg:h-52 xl:h-72 mx-1 rounded-lg "
                    alt="Anime Artwork"
                    unoptimized
                    placeholder="blur"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p>No artwork found</p>
            )}
          </div>

          <p className="text-xl md:text-2xl p-1 font-semibold">Logos</p>
          <div className="carousel rounded-box w-full">
            {artwork.logos ? (
              artwork.logos.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <Image
                    src={
                      item.file_path
                        ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.file_path}`
                        : "/placeholder.svg"
                    }
                    width={500}
                    height={200}
                    className="w-auto h-44 md:h-48 lg:h-52 xl:h-72 mx-1 rounded-lg "
                    alt="Anime Artwork"
                    unoptimized
                    placeholder="blur"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p>No artwork found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeriesInfoTabs;
