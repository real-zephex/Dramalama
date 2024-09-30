"use client";

import {
  isHLSProvider,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  Poster,
  RadioGroup,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState, useEffect, useMemo, useCallback, memo, useRef } from "react";

import { DramaInfo, DramaLinks, DramaEpisode } from "@/utils/types";
import { DramaLinksFetcher } from "@/utils/kdrama-requests/request";
import { CheckIcon } from "@vidstack/react/icons";

const PROXY = process.env.NEXT_PUBLIC_M3U8_PROXY as string;

const DramaVideoPage = ({ data }: { data: DramaInfo }) => {
  const mediaId: string = data.id!;

  const [src, setSrc] = useState<string>("");
  const player = useRef<MediaPlayerInstance>(null);
  const [currentPlaying, setCurrentPlaying] = useState<string>("");
  const [accordionStatus, setAccordionStatus] = useState<"shrink" | "expand">(
    "shrink"
  );
  const [episodeTitle, setEpisodeTitle] = useState<string>("");
  const [loading, setLoading] = useState<JSX.Element>(<></>);
  const [ogSource, setOgSource] = useState<string>("");
  const [backupSource, setBackupSource] = useState<string>("");

  const memoizedData = useMemo(() => data, [data]);
  const first_entry: DramaEpisode | any = useMemo(
    () => (data.episodes?.length! > 0 ? data.episodes![0] : []),
    [data]
  );

  useEffect(() => {
    const init = async () => {
      await videoFormatter(first_entry.id!);
      setCurrentPlaying(first_entry.title!);
    };

    init();
  }, []);

  const vidLinksFetcher = async (id: string) => {
    if (data.episodes?.length === 0) {
      return;
    }
    setLoading(vidLoadingIndicator);
    const res: DramaLinks = await DramaLinksFetcher({
      dramaId: mediaId,
      episodeId: id,
    });

    if (!res) {
      console.log("No data found");
      return null;
    }

    setLoading(<></>);
    const sourcesArray = Array.from(res.sources!, (item) => item.url);
    if (sourcesArray && sourcesArray.length > 1) {
      setOgSource(`${PROXY}${sourcesArray[0]!}`);
      setBackupSource(`${PROXY}${sourcesArray[1]!}`);
    }

    const tempRes = await fetch(`${PROXY}${sourcesArray[0]}`, {
      cache: "no-cache",
    });
    if (!tempRes.ok) {
      return `${PROXY}${sourcesArray[1]}`;
    } else {
      return `${PROXY}${sourcesArray[0]}`;
    }
  };

  const vidLoadingIndicator = (
    <div className="absolute top-0 right-0 left-0 bg-black/75 z-10 w-full h-full flex justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );

  const videoFormatter = useCallback(
    async (id: string) => {
      let url;
      try {
        url = await vidLinksFetcher(id);
      } catch (error) {
        url = "/not_found.mp4";
      }

      setEpisodeTitle(epTitle(id));
      setSrc(url!);
    },
    [memoizedData]
  );

  const epTitle = (id: string) => {
    try {
      const splitTitle = id.split("-");
      return splitTitle[splitTitle.length - 1];
    } catch (error) {
      return "not released yet";
    }
  };

  const toggleAccordion = () => {
    setAccordionStatus((prevStatus) =>
      prevStatus === "shrink" ? "expand" : "shrink"
    );
  };

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    _nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <main>
      <div className="flex 2xl:flex-row flex-col w-full">
        <div className="w-full relative h-full">
          {loading}
          <MediaPlayer
            title={`${data.title} - Episode ${episodeTitle}`}
            src={src}
            aspectRatio="16/9"
            load="eager"
            playsInline
            ref={player}
            volume={0.5}
            crossOrigin
            keyTarget="player"
            onProviderChange={onProviderChange}
            streamType="on-demand"
            onCanPlay={() => {
              if (src === "/not_found.mp4") {
                return;
              }
              const qualities = player.current?.qualities!;
              const preferredQuality = qualities[qualities?.length! - 1];
              preferredQuality!.selected = true;
            }}
          >
            <MediaProvider>
              <Poster
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                src={`${PROXY}${data.image}`}
                alt={`${data.title} Poster`}
              />
            </MediaProvider>
            <DefaultAudioLayout icons={defaultLayoutIcons} />
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
                      value="check"
                      key="check"
                      onClick={() => setSrc(ogSource)}
                    >
                      <CheckIcon className="vds-icon" />
                      <span className="vds-radio-label">Default</span>
                    </RadioGroup.Item>
                    <RadioGroup.Item
                      className="vds-radio"
                      value="check 2"
                      key="check 2"
                      onClick={() => {
                        setSrc(backupSource);
                      }}
                    >
                      <CheckIcon className="vds-icon" />
                      <span className="vds-radio-label">Backup</span>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                ),
              }}
            />
          </MediaPlayer>
        </div>
        <div className="2xl:w-1/4 w-full 2xl:mt-0">
          <div
            className="collapse bg-gradient-to-b from-base-300 to-base-200/40 rounded-none"
            defaultChecked
            onClick={toggleAccordion}
          >
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              <b>Episodes</b> - click to {accordionStatus}
              <p className="text-sm">
                Currently playing{" "}
                <span className="text-violet-400">{currentPlaying}</span>
              </p>
            </div>
            <div
              className="collapse-content w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="grid grid-cols-5 2xl:grid-cols-5 gap-2 md:grid-cols-10 lg:grid-cols-12 max-h-[15rem] md:max-h-[20rem] lg:max-h-[25rem] xl:max-h-[30rem] 2xl:max-h-[35rem] overflow-auto">
                {memoizedData.episodes && memoizedData.episodes.length > 0 ? (
                  memoizedData.episodes.map((item, _) => (
                    <button
                      key={_}
                      className="btn btn-sm md:btn-xs bg-zinc-800 font-normal w-auto transition duration-75 ease-in-out hover:opacity-80"
                      onClick={() => {
                        videoFormatter(item.id!);
                        setCurrentPlaying(item.title!);
                      }}
                    >
                      EP {item.episode}
                    </button>
                  ))
                ) : (
                  <button
                    className="btn-wide btn btn-error btn-outline "
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    No episodes found.
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DramaVideoPage;
