"use client";

import { SetStateAction, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { AnimeRequestHandler } from "@/utils/anime-requests/request";
import AnimesSearchFormatter from "./anime-ui/anime-search-formatter";

import MoviesSearch from "./movies-ui/movie-search-formatter";
import { MoviesSearchRequest } from "@/utils/movie-requests/request";

import { SearchDramas } from "@/utils/kdrama-requests/request";
import DramaSearchFormatter from "./kdrama-ui/drama-search-formatter";

import { SearchTV } from "@/utils/tv-requests/request";
import SeriesSearchFormatter from "./web-ui/search-cards";

const Search = () => {
  const pathname = usePathname() as string;
  const [provider, setProvider] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [format, setFormat] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const test = pathname.split("/").length !== 0 ? pathname.split("/")[1] : "";
    setProvider(test);
  }, [pathname]);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setProvider(event.target.value);
    console.log(`Selected: ${event.target.value}`);
  };

  const handleSearch = useCallback(
    async (event: { key: string; code: string }) => {
      if (event.key === "Enter" || event.code === "Enter") {
        // Intentionally left blank (do nothing)
      } else {
        return; // Exit the function if it's not the Enter key
      }
      setFormat(
        <div className="flex items-center justify-center">
          <span className="loading loading-dots loading-md"></span>
        </div>
      );
      let data;
      if (provider === "movies") {
        data = await MoviesSearchRequest(title);
        const search_formatter = await MoviesSearch(data);
        setFormat(search_formatter);
      } else if (provider === "animes") {
        data = await AnimeRequestHandler({ search: true, searchQuery: title });
        const search_formatter = await AnimesSearchFormatter({ data });
        setFormat(search_formatter);
      } else if (provider === "kdramas") {
        data = await SearchDramas(title);
        const search_formatter = await DramaSearchFormatter({ data });
        setFormat(search_formatter);
      } else if (provider === "web-series") {
        data = await SearchTV({ title: title });
        const search_formatter = await SeriesSearchFormatter({ data });
        setFormat(search_formatter);
      }
    },
    [title, provider]
  );

  useHotkeys("ctrl+k", (event) => {
    event.preventDefault(); // Prevent the browser's default behavior
    event.stopPropagation(); // Stop the event from propagating
    const modal = document.getElementById(
      "my_modal_4"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  });

  return (
    <div>
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_4"
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
        hidden={pathname == "/"}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </button>
      <dialog id="my_modal_4" className="modal items-start p-2">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box md:w-11/12 md:max-w-6xl p-2 w-full">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>

          <section className="flex mt-4">
            <div className="w-full">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="search"
                  className="grow"
                  placeholder="Search"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  onKeyDown={handleSearch}
                  autoFocus={true}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <select
              className="select select-accent w-full max-w-36 ml-1"
              onChange={handleChange}
              value={provider}
            >
              <option disabled value={""}>
                Select
              </option>
              <option value={"movies"}>Movies</option>
              <option value={"kdramas"}> K-Dramas</option>
              <option value={"animes"}>Anime</option>
              <option value={"web-series"}>Web-Series</option>
            </select>
          </section>
          <div
            className="mt-1"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_4"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.close();
              }
              setTitle("");
            }}
          >
            {format}
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Search;
