import Link from "next/link";
import Image from "next/image";

import { FaStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

import { EpisodeInfo } from "@/utils/tv-requests/request";
import { FlixHQEpisodeInfo } from "@/utils/tv-requests/request";
import SeriesCustomVideoPlayer from "@/components/web-ui/custom-video-player";

const SeriesPlayer = async ({ params }: { params: { slugs: string[] } }) => {
  const series_id = params.slugs[2];
  const season_number = params.slugs[0];
  const episode_number = params.slugs[1];

  const data = await FlixHQEpisodeInfo({
    seriesId: series_id,
    season: season_number,
    episode: episode_number,
  });

  const epData = await EpisodeInfo({
    id: series_id,
    season: season_number,
    episode: episode_number,
  });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <div className="container mx-auto">
        <div role="tablist" className="tabs tabs-boxed">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="vidsrc"
            defaultChecked={data.videoURL?.url ? false : true}
          />
          <div role="tabpanel" className="tab-content p-2">
            <iframe
              src={`https://vidsrc.pro/embed/tv/${series_id}/${season_number}/${episode_number}`}
              allowFullScreen
              height={720}
              className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            ></iframe>
          </div>

          {/* <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="vidsrc.vip"
          />
          <div role="tabpanel" className="tab-content p-2">
            <iframe
              src={`https://vidsrc.vip/embed/tv/${series_id}/${season_number}/${episode_number}?autoplay=false`}
              allowFullScreen
              height={720}
              className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
            ></iframe>
          </div> */}

          {/* <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="superembed"
          />
          <div role="tabpanel" className="tab-content p-2">
            <iframe
              src={`https://multiembed.mov/directstream.php?video_id=${series_id}&tmdb=1&s=${season_number}&e=${episode_number}`}
              allowFullScreen
              height={720}
              className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
            ></iframe>
          </div> */}

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="custom"
            defaultChecked={data.videoURL?.url ? true : false}
          />
          <div role="tabpanel" className="tab-content p-2">
            <SeriesCustomVideoPlayer
              data={data}
              season={season_number}
              episode={episode_number}
              id={`${series_id}-S${season_number}E${episode_number}`}
            />
          </div>
        </div>

        <section className="mt-2 flex flex-col md:flex-row items-center bg-base-200 rounded-xl p-2">
          {epData && (
            <div className="bg-base-300 rounded-xl cursor-pointer w-full md:w-auto">
              <Image
                src={
                  epData.still_path
                    ? `https://image.tmdb.org/t/p/original${epData.still_path}`
                    : "/placeholder.svg"
                }
                width={300}
                height={150}
                alt="Episode Poster"
                className="w-full rounded-t-xl md:rounded-tl-xl max-w-72 h-auto"
              />
              <div className="p-2">
                <p className="text-sm">Episode {episode_number}</p>
                <h1 className="text-xl font-semibold mt-1">{epData.name}</h1>
                <section className="flex flex-row items-center">
                  <FaStar className="text-yellow-300" />
                  <span className="ml-1">{epData.vote_average}</span>
                </section>
              </div>
            </div>
          )}

          <div className="mt-2 md:ml-2">
            <p className="text-sm bg-base-300 md:w-fit w-full px-2 py-1 rounded-xl text-center">
              Watching Episode {episode_number} - Season {season_number}
            </p>
            {epData && epData.overview && (
              <p className="text-lg">
                <strong>Overview</strong>:{" "}
                <span className="font-normal">{epData.overview}</span>
              </p>
            )}
            <div className="my-1">
              <Link
                href={`https://dl.vidsrc.vip/tv/${series_id}/${season_number}/${episode_number}`}
                target="_blank"
              >
                <button className="btn btn-success btn-sm btn-outline">
                  Download <FiDownload />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SeriesPlayer;
