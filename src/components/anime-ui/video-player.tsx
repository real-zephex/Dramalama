"use client";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  type MediaPlayerInstance,
  Poster,
  RadioGroup,
  Track,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState, useEffect, useMemo, useCallback, useRef, use } from "react";
import { FaCheck, FaDownload } from "react-icons/fa";

import { AnimeLinks, Episode, GogoanimeInfo } from "@/utils/types";
import {
  AnimeRequestHandler,
  animeLinksCacher,
  AniwatchVideoLinksHandler,
} from "@/utils/anime-requests/request";
import { AniwatchLinks, Track as BooTrack, Tro } from "@/utils/more-types";

interface VideoSources {
  title: string;
  url: string;
}

const PROXY = process.env.NEXT_PUBLIC_M3U8_PROXY as string;

const AnimeVideoPage = ({
  data,
  aniwatchData,
}: {
  data: GogoanimeInfo;
  aniwatchData: AniwatchLinks | null;
}) => {
  const [currentPlaying, setCurrentPlaying] = useState<string>("");
  const [buttonGroups, setButtonGroups] = useState<JSX.Element>(<></>);
  const [accordionStatus, setAccordionStatus] = useState<"shrink" | "expand">(
    "shrink"
  );
  const player = useRef<MediaPlayerInstance>(null);
  const [cacheConfirmation, setCacheConfirmation] = useState<JSX.Element>(
    <></>
  );
  const [src, setSrc] = useState<string>("");
  const [episodeTitle, setEpisodeTitle] = useState<string>("");
  const [download, setDownload] = useState<string>("");
  const [loading, setLoading] = useState<JSX.Element>(<></>);
  const [autoplay, setAutoPlay] = useState<boolean>(false);
  const [episodeId, setEpisodeId] = useState<string>("");
  const [sources, setSources] = useState<VideoSources[]>([]);
  const [aniSources, setAniSources] = useState<VideoSources[]>([]);
  const [chapter, setChapters] = useState<string>("");

  const [thumbnails, setThumbnails] = useState<string>();
  const [subtitles, setSubtitles] = useState<BooTrack[]>();

  const memoizedData = useMemo(() => data, [data]);
  const groups = createGroups(data.episodes!, 100);

  const first_id: any = useMemo(
    () => (data.episodes?.length! > 0 ? data.episodes![0] : []),
    [data]
  );
  const vidLoadingIndicator = (
    <div className="absolute top-0 right-0 left-0 bg-black/75 z-10 w-full h-full flex justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );

  useEffect(() => {
    const init = async () => {
      setCurrentPlaying(first_id.number.toString()!);
      videoFormatter(first_id.id);
      if (aniwatchData) {
        aniwatchVideoLinksFetcher(first_id.number);
      }
    };

    init();
  }, [first_id]);

  useEffect(() => {
    setButtonGroups(createButtonGroups(0, 100));
    cacheInit(0, data.episodes?.length! < 100 ? data.episodes?.length! : 100);
  }, [data.episodes]);

  const cacheInit = async (start: number, end: number) => {
    const cacheConfirmation = await animeLinksCacher(
      data.episodes!,
      start,
      end
    );
    if (cacheConfirmation) {
      setCacheConfirmation(cacheMessage(start, end));
    }
    setTimeout(() => {
      setCacheConfirmation(<></>);
    }, 3000);
  };

  const cacheMessage = (start: number, end: number) => {
    return (
      <div className="toast z-50 ">
        <div className="alert alert-info">
          <span>
            Links for Episodes {start.toString()} - {end.toString()} fetched
            successfully
          </span>
        </div>
      </div>
    );
  };

  const createButtonGroups = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return (
      <div
        className="grid grid-cols-5 2xl:grid-cols-5 gap-2 md:grid-cols-10 lg:grid-cols-12 my-2"
        onClick={(e) => e.stopPropagation()}
      >
        {data.episodes &&
          data.episodes.slice(start, end).map((item, index) => (
            <button
              key={index}
              className="btn btn-sm w-[75px] md:w-[70px] md:btn-xs bg-zinc-800 font-normal"
              id={item.id}
              type="button"
              onClick={(event) => {
                if (player.current) {
                  player.current.paused = true;
                  player.current.currentTime = 0;
                }
                event.currentTarget.style.backgroundColor = "gray";
                videoFormatter(item.id!);
                aniwatchVideoLinksFetcher(item.number!);
                setCurrentPlaying(item.number?.toString()!);
              }}
            >
              {item.number}
            </button>
          ))}
      </div>
    );
  };

  const aniwatchVideoLinksFetcher = async (episodeNumber: number) => {
    var tempPart;
    setAniSources([]);
    if (aniwatchData && aniwatchData.episodes) {
      tempPart = aniwatchData.episodes.find(
        (element) => element.number === episodeNumber
      );
    }

    if (tempPart) {
      const subbedData = await AniwatchVideoLinksHandler({
        id: tempPart.episodeId!,
        type: "sub",
      });
      if (subbedData) {
        if (subbedData.intro && subbedData.outro) {
          let skipTimesConfig = {
            start: subbedData.intro,
            end: subbedData.outro,
          };
          generateVTT(skipTimesConfig);
        }

        // let vtt = generateVTT(subbedData.)
        setThumbnails(
          `https://vtt.blasphemy8473.workers.dev/${subbedData.thumnails}`
        );
        if (subbedData.sources) {
          setAniSources((prevSources) => {
            // Deduplicate sources by using a Set to ensure unique entries
            const existingUrls = new Set(
              prevSources.map((source) => source.url)
            );
            const newSources = subbedData.sources.filter(
              (source) => !existingUrls.has(source.url)
            );
            return [...prevSources, ...newSources];
          });
          setSubtitles(subbedData.subtitles);
        }
      }

      const dubbedData = await AniwatchVideoLinksHandler({
        id: tempPart.episodeId!,
        type: "dub",
      });
      if (dubbedData) {
        if (dubbedData.sources) {
          setAniSources((prevSources) => {
            // Deduplicate sources by using a Set to ensure unique entries
            const existingUrls = new Set(
              prevSources.map((source) => source.url)
            );
            const newSources = dubbedData.sources.filter(
              (source) => !existingUrls.has(source.url)
            );
            return [...prevSources, ...newSources];
          });
        }
      }
    }
  };

  interface skipTimes {
    start: Tro | null;
    end: Tro | null;
  }
  const generateVTT = useCallback(
    ({ start, end }: skipTimes) => {
      let vttString = "WEBVTT\n\n";
      let previousEndTime = 0;

      const { start: openingStart, end: openingEnd } = start!;
      const { start: closingStart, end: closingEnd } = end!;

      // if there's a gap between beginning of the video and opening music
      if (previousEndTime < openingStart) {
        vttString += `${formatTime(previousEndTime)} --> ${formatTime(
          openingStart
        )}\n`;
        vttString += `${data.title} - Episode ${currentPlaying}\n\n`;
      }

      vttString += `${formatTime(openingStart)} --> ${formatTime(
        openingEnd
      )}\n`;
      vttString += `Opening\n\n`;
      previousEndTime = openingEnd;

      // if there's a gap between the end of the opening and the start of the closing
      if (previousEndTime < closingStart) {
        vttString += `${formatTime(previousEndTime)} --> ${formatTime(
          closingStart
        )}\n`;
        vttString += `${data.title} - Episode ${currentPlaying}\n\n`;
      }

      // Add closing skip times
      vttString += `${formatTime(closingStart)} --> ${formatTime(
        closingEnd
      )}\n`;
      vttString += `Closing\n\n`;
      previousEndTime = closingEnd;

      const blob = new Blob([vttString], { type: "text/vtt" });
      const vttBlobUrl = URL.createObjectURL(blob);

      setChapters(vttBlobUrl);
    },
    [data.title, currentPlaying, setChapters]
  );

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  const vidLinksFetcher = async (id: string) => {
    setLoading(vidLoadingIndicator);
    setEpisodeId(id);
    const res: AnimeLinks = await AnimeRequestHandler({
      watch: true,
      episodeId: id,
    });

    if (!res) {
      console.log("No data found");
      return null;
    }
    const temp = res.sources?.find((source) => source.quality === "backup");
    const defaultUrl = res.sources?.find(
      (source) => source.quality === "default"
    );

    const download = res.download;
    // Backup source will be used first

    if (download) {
      setDownload(download);
    }

    const tempRes = await fetch(`${PROXY}${temp?.url}`, {
      cache: "no-cache",
    });
    setLoading(<></>);

    if (temp?.url && defaultUrl?.url) {
      let tempData = [
        {
          title: "Backup",
          url: `${PROXY}${defaultUrl.url}`,
        },
        {
          title: "Default",
          url: `${PROXY}${temp.url}`,
        },
      ];

      setSources([...sources, ...tempData]);
    }

    if (!tempRes.ok) {
      return `${PROXY}${defaultUrl?.url}`;
    }

    return `${PROXY}${temp?.url}`;
  };

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    _nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  const videoFormatter = useCallback(
    async (id: string) => {
      let url;
      try {
        url = await vidLinksFetcher(id);
      } catch (error) {
        url = "/not_found.mp4";
      }

      setSrc(url!);
      setEpisodeTitle(getEpisodeNumber(id));
    },
    [memoizedData]
  );

  function getEpisodeNumber(id: string): string {
    try {
      const parts = id.split("-");
      return parts[parts.length - 1];
    } catch (error) {
      return "not released yet";
    }
  }

  function handleSelectChange(item: Episode[]) {
    const start_index = item[0].number;
    const end_index = item[item.length - 1].number;
    setButtonGroups(createButtonGroups(start_index! - 1, end_index));
    if (start_index && end_index) {
      cacheInit(start_index, end_index);
    }
  }

  const toggleAccordion = () => {
    setAccordionStatus((prevStatus) =>
      prevStatus === "shrink" ? "expand" : "shrink"
    );
  };

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
      allPlaybackInfo[episodeId] = playbackInfo;
      localStorage.setItem(
        "all_episode_times",
        JSON.stringify(allPlaybackInfo)
      );
    }
  }

  function setPlayerTime() {
    const localData: any =
      JSON.parse(localStorage.getItem("all_episode_times")!) || "{}";

    if (!localData[episodeId]) {
      return;
    }
    const current = localData[episodeId]["currentTime"];
    if (player.current) {
      player.current.currentTime = current;
    }
  }

  return (
    <main>
      {cacheConfirmation}
      <div className="flex 2xl:flex-row flex-col w-full">
        <div className="w-full relative">
          {loading}
          <MediaPlayer
            title={`${data.title} - Episode ${episodeTitle}`}
            src={src}
            aspectRatio="16/9"
            load="eager"
            playsInline
            ref={player}
            volume={0.5}
            autoPlay={autoplay}
            crossOrigin
            keyTarget="player"
            onProviderChange={onProviderChange}
            streamType="on-demand"
            onTimeUpdate={onTimeUpdate}
            posterLoad="eager"
            onCanPlay={() => {
              setAutoPlay(false);
              const qualities = player.current?.qualities!;
              if (qualities) {
                const preferredQuality = qualities[qualities?.length! - 1];
                preferredQuality!.selected = true;
              }

              setPlayerTime();
            }}
          >
            <MediaProvider>
              {subtitles &&
                subtitles.map((item, _) => (
                  <Track
                    src={item.file}
                    kind="subtitles"
                    label={item.label}
                    // lang="en-US"
                    type="vtt"
                    key={item.file}
                  />
                ))}

              {chapter && (
                <Track
                  src={chapter}
                  kind="chapters"
                  label="Skip Times"
                  default
                />
              )}

              <Poster
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                src={`${PROXY}${data.image}`}
                alt={`${data.title} Poster`}
              />
            </MediaProvider>
            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout
              thumbnails={thumbnails ? thumbnails : ""}
              icons={defaultLayoutIcons}
              slots={{
                beforeSettingsMenu: (
                  <button
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={() => window.open(download, "_blank")}
                  >
                    <FaDownload color="white" size={20} />
                  </button>
                ),
                afterPlaybackMenuItemsEnd: (
                  <div className="flex flex-col items-center w-full mx-0 mt-2 bg-neutral-800/50">
                    {sources.map((item, _) => (
                      <RadioGroup.Root
                        className="vds-radio-group"
                        aria-label="Custom Options"
                        key={_}
                      >
                        <RadioGroup.Item
                          className="vds-radio"
                          value="check"
                          key="check"
                          onClick={() => setSrc(item.url)}
                        >
                          <FaCheck
                            className="mr-2"
                            color={src === item.url ? "green" : "white"}
                          />
                          <span className="vds-radio-label ml-2">
                            {item.title}
                          </span>
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                    ))}
                    {aniSources.map((item, _) => (
                      <RadioGroup.Root
                        className="vds-radio-group"
                        aria-label="Custom Options"
                        key={_}
                      >
                        <RadioGroup.Item
                          className="vds-radio"
                          value="check"
                          key="check"
                          onClick={() => setSrc(item.url)}
                        >
                          <FaCheck
                            className="mr-2"
                            color={src === item.url ? "green" : "white"}
                          />
                          <span className="vds-radio-label ml-2">
                            {item.title}
                          </span>
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                    ))}
                  </div>
                ),
              }}
            />
          </MediaPlayer>
          <p className="text-xs text-center pb-1 text-gray-500 hidden 2xl:block">
            If you encounter any issues with video playback, try switching to a
            different source. Click the settings icon in the video player, go to
            the playback section, and select one of the available sources.
          </p>
        </div>
        <div className="2xl:w-1/4 w-full">
          <div
            className="collapse bg-gradient-to-b from-base-300 to-base-200/75 rounded-none p-0"
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
            <div className="collapse-content">
              {memoizedData.episodes && (
                <div className="w-full">
                  <select
                    className="select select-bordered w-full"
                    onChange={(event) => {
                      // Get the selected option
                      const selectedOption =
                        event.target.options[event.target.selectedIndex];
                      // Retrieve the data-value from the selected option
                      const target = selectedOption.getAttribute("data-value");
                      if (!target) {
                        return;
                      }
                      handleSelectChange(JSON.parse(target!));
                      // handleSelectChange(target);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option disabled>Episode Group</option>
                    {groups.length > 0 ? (
                      groups.map((item, index) => (
                        <option key={index} data-value={JSON.stringify(item)}>
                          {item[0].number} - {item[item.length - 1].number}
                        </option>
                      ))
                    ) : (
                      <option defaultChecked>No episodes found</option>
                    )}
                  </select>
                </div>
              )}
              {buttonGroups}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnimeVideoPage;

function createGroups(array: Episode[], size: number) {
  const groups = [];
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size));
  }
  return groups;
}
