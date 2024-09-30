"use server";

import Image from "next/image";
import Link from "next/link";

import { MoviesHomepageResults } from "@/utils/types";

const MoviesSearch = async (data: MoviesHomepageResults | undefined) => {
  return (
    <div className="flex flex-col mt-4">
      {data && data.results.length > 0 ? (
        data.results.map((item) => (
          <Link href={`/movies/${item.id}`} key={item.id}>
            <span className="sr-only">View {item.title}</span>
            <section
              key={item.id}
              className="flex flex-row items-center mb-2 bg-base-300 rounded-xl transition delay-50 ease-in-out hover:bg-base-200"
            >
              <Image
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                    : "/placeholder.svg"
                }
                width={100}
                height={150}
                alt={`${item.original_title} poster`}
                className="rounded-l-xl"
                priority
              />
              <div className="flex-col ml-2">
                <p className="text-xl">{item.title}</p>
                {item.release_date && (
                  <div className="badge badge-accent badge-outline">
                    {item.release_date}
                  </div>
                )}
              </div>
            </section>
          </Link>
        ))
      ) : (
        <p className="py-1 text-center">No results found</p>
      )}
    </div>
  );
};

export default MoviesSearch;
