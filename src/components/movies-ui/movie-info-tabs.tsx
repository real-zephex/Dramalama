import {
  MovieInfoType,
  MoviesHomepageResults,
  TVCredits,
  TVImages,
} from "@/utils/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PiThumbsUp } from "react-icons/pi";
import { FiDownload } from "react-icons/fi";

const MoreMovieInfo = async ({
  data,
  recommendation_data,
  cast_data,
  images_data,
}: {
  data: MovieInfoType | null;
  recommendation_data: MoviesHomepageResults | null;
  cast_data: TVCredits;
  images_data: TVImages;
}) => {
  return (
    <div role="tablist" className="tabs tabs-lifted mt-2">
      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Info"
        defaultChecked
      />
      {data && (
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          <p className="md:hidden">
            <b>Description</b>: {data.overview}
          </p>
          <p>
            <b>Genres</b>:{" "}
            {data.genres.map((item, index) => (
              <React.Fragment key={item.id}>
                <span>{item.name}</span>
                {index < data.genres.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <p>
            <b>Homepage</b>:{" "}
            <Link href={data.homepage} target="_blank" className="text-warning">
              {data.homepage}
            </Link>
          </p>
          <p>
            <b>Budget</b>: ${data.budget.toLocaleString()} | <b>Revenue</b> : $
            {data.revenue.toLocaleString()}
          </p>
          <p>
            <b>Runtime</b>: {data.runtime} minutes
          </p>
          <div className="my-1">
            <Link
              href={`https://dl.vidsrc.vip/movie/${data.id}`}
              target="_blank"
            >
              <button className="btn btn-success btn-sm btn-outline">
                Download <FiDownload />
              </button>
            </Link>
          </div>
        </div>
      )}

      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Recommendations"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-2"
      >
        {recommendation_data &&
          recommendation_data.results.slice(0, 10).map((item, _) => (
            <React.Fragment key={item.id}>
              <Link href={`/movies/${item.id}`}>
                <div className="flex flex-row items-center mb-2 bg-base-200 rounded-md transition delay-50 ease-in-out hover:bg-base-100">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={80}
                    height={130}
                    alt="Movie Poster"
                    className="rounded-l-md"
                  ></Image>
                  <div className="flex flex-col ml-1">
                    <p className="text-white">{item.title}</p>
                    <div className="text-sm flex flex-row items-center">
                      <span>{item.release_date}</span>
                      <span className="mx-2 font-bold">|</span>
                      <span>{item.vote_average}</span>
                      <span className="ml-1">
                        <PiThumbsUp fontWeight={700} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Cast"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-2"
      >
        <div className="rounded-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3">
          {cast_data.cast && cast_data.cast.length > 0 ? (
            cast_data.cast.map((item, index) => (
              <div
                className="flex flex-row items-center bg-base-200 rounded-md cursor-pointer transition delay-50 ease-in-out hover:bg-base-200/50"
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
                  className="w-24 h-32 mx-1 rounded-l-md "
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
        name="my_tabs_3"
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
          {images_data.backdrops && images_data.backdrops.length > 0 ? (
            images_data.backdrops.map((item, index) => (
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
          {images_data.posters && images_data.posters.length > 0 ? (
            images_data.posters.map((item, index) => (
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
          {images_data.logos && images_data.logos.length > 0 ? (
            images_data.logos.map((item, index) => (
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
  );
};

export default MoreMovieInfo;
