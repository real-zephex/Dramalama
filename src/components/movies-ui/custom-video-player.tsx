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

interface Subtitle {
  url?: string;
  lang?: string;
}

const PROXY = process.env.NEXT_PUBLIC_M3U8_PROXY as string;

export default function CustomVideoPlayer({
  movieTitle,
  subtitle,
  source,
  cover,
  otherLinks,
  id,
  headers,
}: {
  movieTitle: string;
  subtitle: Subtitle[] | undefined;
  source: string;
  cover: string;
  otherLinks: string[] | undefined;
  id: string;
  headers: string;
}) {
  const player = useRef<MediaPlayerInstance>(null);

  const [src, setSrc] = useState(`${PROXY}${source}`);

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

  return (
    <div>
      <MediaPlayer
        title={movieTitle}
        src={{ src: src, type: "application/x-mpegurl" }}
        load="eager"
        aspectRatio="16/9"
        playsInline
        volume={0.5}
        crossOrigin
        keyTarget="player"
        onTimeUpdate={onTimeUpdate}
        streamType="on-demand"
        ref={player}
        onCanPlay={() => {
          const qualities = player.current?.qualities!;
          if (qualities) {
            const preferredQuality = qualities[qualities?.length! - 1];
            preferredQuality!.selected = true;
          }
          setPlayerTime();
        }}
      >
        <MediaProvider>
          {subtitle &&
            subtitle.map((item) => (
              <Track
                key={item.lang}
                src={item.url}
                kind="subtitles"
                label={item.lang}
                // lang="en-US"
                type="vtt"
                default={item.lang === "English"}
              />
            ))}
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src={cover ? `${PROXY}${cover}` : "/placeholder.svg"}
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
                  onClick={() => setSrc(`${PROXY}${source}`)}
                >
                  {src === `${PROXY}${source}` && (
                    <CheckIcon className="vds-icon" />
                  )}
                  <span className="vds-radio-label">Default</span>
                </RadioGroup.Item>
                {otherLinks &&
                  otherLinks[0] &&
                  !otherLinks[0].match(
                    /^https:\/\/vidsrc\.cc\/api\/proxy\/playlist\?code=.*$/
                  ) && (
                    <RadioGroup.Item
                      className="vds-radio"
                      value="check 2"
                      key="check 2"
                      onClick={() => {
                        setSrc(otherLinks![0]);
                      }}
                    >
                      {src === otherLinks![0] && (
                        <CheckIcon className="vds-icon" />
                      )}
                      <span className="vds-radio-label">Source 2</span>
                    </RadioGroup.Item>
                  )}
                {otherLinks![1] && (
                  <RadioGroup.Item
                    className="vds-radio"
                    value="check 3"
                    key="check 3"
                    onClick={() => {
                      setSrc(otherLinks![1]);
                    }}
                  >
                    {src === otherLinks![1] && (
                      <CheckIcon className="vds-icon" />
                    )}
                    <span className="vds-radio-label">Source 3</span>
                  </RadioGroup.Item>
                )}
              </RadioGroup.Root>
            ),
          }}
        />
      </MediaPlayer>
      <p className="text-xs text-center pb-1 text-gray-500 hidden 2xl:block">
        If you experience any issues during video playback then, try changing
        the video source. Click the settings icon in the video player, go to
        playback and change source.
      </p>
    </div>
  );
}
