import { TrendingPopularTopAiringTV } from "@/utils/types";
import { FaStar } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";

const WebHomepageCards = async ({
  data,
}: {
  data: TrendingPopularTopAiringTV;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.results && data.results.length > 0 ? (
        data.results.slice(0, 8).map((item, _) => (
          <div
            key={item.id}
            className="bg-background rounded-lg shadow-lg overflow-hidden group"
          >
            <Link href={`/web-series/${item.id}`} className="">
              <Image
                src={
                  item.backdrop_path
                    ? `${
                        process.env.NEXT_PUBLIC_PROXY_2 as string
                      }https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    : "/placeholder.svg"
                }
                alt={item.name!}
                width={300}
                height={168}
                className="w-full object-cover max-h-52 transition-opacity group-hover:opacity-50"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
                quality={100}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {item.name || item.original_name}
                </h3>
                <div className="flex items-center mb-2">
                  <FaStar
                    className=" mr-1"
                    size={14}
                    color={
                      item.vote_average! > 8
                        ? "#02EBF4"
                        : item.vote_average! < 8 && item.vote_average! > 5
                        ? "#59FE17"
                        : "#FF0103"
                    }
                  />
                  <span className="text-sm font-medium">
                    {item.vote_average}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default WebHomepageCards;
