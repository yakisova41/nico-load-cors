import type { InitialWatchDataType } from "./apiTypes/intialWatchData";
import fetch from "node-fetch";
import { parse } from "node-html-parser";

export default async function getInitialWatchData(
  videoid: string
): Promise<InitialWatchDataType | null> {
  const res = await fetch(`https://www.nicovideo.jp/watch/${videoid}`);
  const text = await res.text();
  const root = parse(text);
  const initialWatchDataElem = root.querySelector("#js-initial-watch-data");

  if (initialWatchDataElem !== null) {
    const data = initialWatchDataElem.getAttribute("data-api-data");
    if (typeof data === "string") {
      const initialWatchData: InitialWatchDataType = JSON.parse(data);
      return initialWatchData;
    }
  }

  return null;
}
