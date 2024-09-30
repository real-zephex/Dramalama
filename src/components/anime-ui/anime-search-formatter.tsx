"use server";

import Image from "next/image";
import Link from "next/link";

import { GogoanimeSearch } from "@/utils/types";
const AnimesSearchFormatter = async ({ data }: { data: GogoanimeSearch }) => {
  return (
    <div className="flex flex-col mt-4">
      {data.results && data.results.length > 0 ? (
        data.results.map((item) => (
          <Link href={`/animes/${item.id}`} key={item.id}>
            <span className="sr-only">View {item.title}</span>
            <section
              key={item.id}
              className="flex flex-row items-center mb-2 bg-base-300 rounded-xl transition delay-50 ease-in-out hover:bg-base-200"
            >
              <Image
                src={item.image ? item.image : "/placeholder.svg"}
                width={100}
                height={150}
                alt={`${item.title} poster`}
                className="rounded-l-xl"
                priority
              />
              <div className="flex-col ml-2">
                <p className="text-xl">{item.title}</p>
                <div className="flex flex-row items-center">
                  {item.releaseDate && (
                    <div className="badge badge-accent badge-outline">
                      {item.releaseDate}
                    </div>
                  )}
                </div>
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

export default AnimesSearchFormatter;
