import { DramaInfo } from "@/utils/types";
import Image from "next/image";
import React from "react";

const DramaInfoComponent = async ({ data }: { data: DramaInfo }) => {
  return (
    <main className=" w-full overflow-hidden">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-row items-center bg-base-300/50 rounded-md p-1">
          <Image
            src={data.image ? data.image : "/placeholder.svg"}
            width={150}
            height={200}
            alt="Anime Poster"
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            className="rounded-l-md "
            quality={100}
          />
          <p className="text-xl md:text-2xl lg:text-3xl ml-2">{data.title}</p>
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
            <p>{data.description}</p>
          </section>
          <br />

          <p>Adult: {data.contentRating || "?"}</p>
          <p>Release year: {data.releaseDate}</p>
          <p>Total episodes: {data.episodes?.length || "?"}</p>
          <p>Duration: {data.duration}</p>
          <p>Status: {data.status}</p>
          <p>
            Genres:{" "}
            {data.genres?.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < data.genres?.length! - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <p>Network: {data.originalNetwork}</p>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Characters"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-2"
        >
          <div className="rounded-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {data.characters && data.characters.length > 0 ? (
              data.characters.map((item, index) => (
                <div
                  className="flex flex-row items-center bg-base-200 rounded-md transition-colors hover:bg-base-300 cursor-pointer"
                  key={index}
                >
                  <Image
                    src={item.imageUrl ? item.imageUrl : "/placeholder.svg"}
                    width={200}
                    height={700}
                    className="w-auto h-32 mx-1 rounded-l-md "
                    alt="Anime Artwork"
                    placeholder="blur"
                    quality={100}
                    blurDataURL="/placeholder.svg"
                  />
                  <p>{item.name}</p>
                </div>
              ))
            ) : (
              <p>No character info found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default DramaInfoComponent;
