"use server";

import Image from "next/image";
import Link from "next/link";

import { TVSearch } from "@/utils/types";

const SeriesSearchFormatter = async ({ data }: { data: TVSearch | null }) => {
  return (
    <div className="flex flex-col mt-4">
      {data?.results && data.results.length > 0 ? (
        data.results.map((item) => (
          <Link href={`/web-series/${item.id}`} key={item.id}>
            <span className="sr-only">View {item.name}</span>
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
                alt={`${item.name} poster`}
                className="rounded-l-xl"
                priority
              />
              <div className="flex-col ml-2">
                <p className="text-xl">{item.name}</p>
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

export default SeriesSearchFormatter;
