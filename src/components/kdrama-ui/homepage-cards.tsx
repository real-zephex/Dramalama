import { DramaSearchRecentPopular } from "@/utils/types";

import Link from "next/link";
import Image from "next/image";

const KdramaHomecard = async ({
  dramaData,
}: {
  dramaData: DramaSearchRecentPopular;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 my-4">
      {dramaData.results &&
        dramaData.results.slice(0, 20).map((item, index) => (
          <Link
            href={`/kdramas/${item.id?.split("/drama-detail/")[1]}`}
            key={index}
            className="rounded-lg group bg-base-200 shadow-xl"
          >
            <Image
              src={
                item.image
                  ? `${process.env.NEXT_PUBLIC_PROXY_2 as string}${item.image}`
                  : "/placeholder.svg"
              }
              width={200}
              height={300}
              alt={`${item.title} poster`}
              className="w-full h-72 xl:h-80 2xl:h-[25rem] group-hover:opacity-80 transition-opacity rounded-t-lg"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              quality={100}
            />
            <h3 className="mt-2 text-lg font-semibold pb-2 px-3">
              {item.title}
            </h3>
          </Link>
        ))}
    </div>
  );
};

export default KdramaHomecard;
