"use client";

import { useRef, useState } from "react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  RadioGroup,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { CheckIcon } from "@vidstack/react/icons";

interface VideoData {
  title?: string;
  cover?: string;
  videoURL?: vidUrls;
  subs?: subs[];
  link2?: string;
  link3?: string;
}

interface vidUrls {
  url?: string;
  isM3U8?: boolean;
  quality?: string;
}

interface subs {
  url?: string;
  lang?: string;
}

const PROXY = process.env.NEXT_PUBLIC_M3U8_PROXY as string;

const SeriesCustomVideoPlayer = ({
  data,
  season,
  episode,
  id,
}: {
  data: VideoData;
  season: string;
  episode: string;
  id: string;
}) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [src, setSrc] = useState<string>(
    data.videoURL ? `${PROXY}${data.videoURL.url!}` : "/not_found.mp4"
  );

  function setPlayerTime() {
    const localData: any =
      JSON.parse(localStorage.getItem("all_episode_times")!) || "{}";

    if (!localData[id]) {
      return;
    }
    const current = localData[id]["currentTime"];
    if (player.current) {
      player.current.currentTime = current;
    }
  }

  function onTimeUpdate() {
    if (player.current) {
      if (player.current.currentTime === 0) {
        return;
      }
      const currentTime = player.current.currentTime;
      const duration = player.current.duration || 1;
      const playbackPercentage = (currentTime / duration) * 100;
      const playbackInfo = {
        currentTime,
        playbackPercentage,
      };
      const allPlaybackInfo = JSON.parse(
        localStorage.getItem("all_episode_times") || "{}"
      );
      allPlaybackInfo[id] = playbackInfo;
      localStorage.setItem(
        "all_episode_times",
        JSON.stringify(allPlaybackInfo)
      );
    }
  }

  return (
    <MediaPlayer
      title={`${data.title} - S${season} E${episode}`}
      src={{
        src: src,
        type: "application/x-mpegurl",
      }}
      load="eager"
      aspectRatio="16/9"
      playsInline
      volume={0.5}
      crossOrigin
      keyTarget="player"
      streamType="on-demand"
      onTimeUpdate={onTimeUpdate}
      ref={player}
      onCanPlay={() => {
        const qualities = player.current?.qualities!;
        if (qualities && data.videoURL?.url) {
          const preferredQuality = qualities[qualities?.length! - 1];
          preferredQuality!.selected = true;
        }
        setPlayerTime();
      }}
    >
      <MediaProvider>
        {data.subs &&
          data.subs.map((item, _) => (
            <Track
              src={item.url}
              kind="subtitles"
              label={item.lang}
              // lang="en-US"
              type="vtt"
              key={_.toString()}
            />
          ))}

        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={data.cover ? `${PROXY}${data.cover}` : "/placeholder.svg"}
          alt="Movie poster"
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          afterPlaybackMenuItemsEnd: (
            <RadioGroup.Root
              className="vds-radio-group mt-2"
              aria-label="Custom Options"
            >
              <RadioGroup.Item
                className="vds-radio"
                value="check 1"
                key="check 1"
                onClick={() => setSrc(`${PROXY}${data.videoURL?.url}`)}
              >
                {src === `${PROXY}${data.videoURL?.url}` && (
                  <CheckIcon className="vds-icon" />
                )}
                <span className="vds-radio-label">Default</span>
              </RadioGroup.Item>
              {data.link2 && (
                <RadioGroup.Item
                  className="vds-radio"
                  value="check 2"
                  key="check 2"
                  onClick={() => {
                    setSrc(data.link2!);
                  }}
                >
                  {src === data.link2 && <CheckIcon className="vds-icon" />}
                  <span className="vds-radio-label">Source 2</span>
                </RadioGroup.Item>
              )}
              {data.link3 && (
                <RadioGroup.Item
                  className="vds-radio"
                  value="check 3"
                  key="check 3"
                  onClick={() => {
                    setSrc(data.link3!);
                  }}
                >
                  {src === data.link3 && <CheckIcon className="vds-icon" />}
                  <span className="vds-radio-label">Source 3</span>
                </RadioGroup.Item>
              )}
            </RadioGroup.Root>
          ),
        }}
      />
    </MediaPlayer>
  );
};

export default SeriesCustomVideoPlayer;
