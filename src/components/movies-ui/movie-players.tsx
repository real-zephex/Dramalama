import React from "react";
import { FlixHQResultsHandler } from "@/utils/movie-requests/request";
import CustomVideoPlayer from "./custom-video-player";

const MoviePlayer = async ({ id }: { id: string }) => {
  const data = await FlixHQResultsHandler({ movieId: id });

  const vidLinksArray = [
    // { title: "vidsrc.to", link: `https://vidsrc.to/embed/movie/${id}` },
    { title: "embedded", link: `https://vidsrc.pro/embed/movie/${id}` },
    // {
    //   title: "multiembed",
    //   link: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    // },
    // { title: "vidsrc.net", link: `https://vidsrc.in/embed/movie?tmdb=${id}` },
    // {
    //   title: "vidsrc.vip",
    //   link: `https://vidsrc.vip/embed/movie/${id}?autoplay=false`,
    // },
    // {
    //   title: "autoembed",
    //   link: `https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://stable-one.autoembed.cc/movie/${id}`,
    // },
    // {
    //   title: "playsrc",
    //   link: `https://playsrc.streamscripts.xyz/embed/movie/${id}`,
    // },
  ];
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {vidLinksArray.map((items, index) => (
        <React.Fragment key={items.title}>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            id={`tab${index}`}
            className="tab"
            aria-label={items.title}
            defaultChecked={
              data ? false : items.title === "vidsrc.pro" ? true : false
            }
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-2 "
          >
            {items.title === "multiembed" || items.title === "vidsrc.vip" ? (
              <iframe
                src={items.link}
                allowFullScreen
                height={720}
                className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
              ></iframe>
            ) : (
              <iframe
                src={items.link}
                allowFullScreen
                height={720}
                className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
              ></iframe>
            )}
          </div>
        </React.Fragment>
      ))}
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        id="custom"
        className="tab"
        aria-label="Custom"
        defaultChecked={data ? true : false}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-2 "
      >
        <CustomVideoPlayer
          movieTitle={data.title!}
          source={data.movieLink?.url!}
          subtitle={data.subtitles}
          cover={data.cover ? data.cover : "/placeholder.svg"}
          otherLinks={[data.link2!, data.link3!]}
          id={id}
          headers={data?.headers || ""}
        />
      </div>
    </div>
  );
};

export default MoviePlayer;
