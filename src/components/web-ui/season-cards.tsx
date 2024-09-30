import { SeasonInfo } from "@/utils/tv-requests/request";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const TVSeriesSeasonCardGen = async ({
  id,
  seasonNumber,
}: {
  id: number;
  seasonNumber: number;
}) => {
  const data = await SeasonInfo({ id: id, season: seasonNumber });

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data && data.episodes && data.episodes!.length > 0 ? (
        data.episodes?.map((item, index) => (
          <div
            className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-base-300/50 cursor-pointer"
            key={index}
          >
            <Link
              href={`/web-series/watch/${item.season_number}/${item.episode_number}/${id}`}
            >
              <Image
                src={
                  item.still_path
                    ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.still_path}`
                    : "/placeholder.svg"
                }
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="/placeholder.svg"
                alt={`Episode ${item.episode_number}`}
                className="aspect-video w-full object-cover transition-opacity group-hover:opacity-50"
              />
              <div className="p-4">
                <div className="mb-1 text-sm font-medium text-muted-foreground">
                  Episode {item.episode_number}
                </div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="text-sm text-muted-foreground flex flex-row items-center">
                  <FaStar className="mr-1" color="yellow" />
                  <p>{item.vote_average}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No epsiodes found</p>
      )}
    </div>
  );
};

export default TVSeriesSeasonCardGen;
