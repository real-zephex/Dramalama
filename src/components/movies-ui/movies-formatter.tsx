import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MoviesDiscover } from "@/utils/movie-requests/request";

const MoviesGridConstructor = async ({ type }: { type: string }) => {
  const data = await MoviesDiscover(type);

  return (
    <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.results &&
        data.results.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-base-300 "
          >
            <Link href={`/movies/${item.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {item.title}</span>
            </Link>
            <Image
              src={
                item.poster_path
                  ? `${
                      process.env.NEXT_PUBLIC_PROXY_2 as string
                    }https://image.tmdb.org/t/p/original${item.poster_path}`
                  : "/placeholder.svg"
              }
              alt={item.title}
              width={500}
              height={750}
              className="w-full h-auto"
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.overview}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <StarIcon className="h-5 w-5 fill-primary" /> */}
                  <span className="text-base flex items-center">
                    <FaStar
                      size={16}
                      className="mr-1"
                      color={
                        item.vote_average > 8
                          ? "#02EBF4"
                          : item.vote_average < 8 && item.vote_average > 5
                          ? "#59FE17"
                          : "#FF0103"
                      }
                    />
                    {item.vote_average.toString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.release_date}
                </span>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default MoviesGridConstructor;
