"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto h-screen flex items-center flex-col justify-center">
      {/* <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
      <h1 className="text-3xl text-emerald-400 py-2 ">Oopsie Doopsie!</h1>
      <p className="py-1">
        Looks like we ran into some error. Sorry for the inconvienence but
        please let me know about this error. Let me know about your experience
        <a href="mailto:zephex@duck.com?subject=Degraded_Experience"> email</a>
      </p>
      <button
        className="btn btn-wide btn-accent btn-sm"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
