import fetch from "node-fetch";
import { Blob } from "buffer";

export async function loadPlayList(masterUri: string) {
  const res = await fetch(masterUri);
  const text = await res.text();

  const splited = text.split("\n");
}

export class HLSLoader {
  public endpoint: string;
  public query: string;
  private masterUri: string;
  private playlistUri: string | undefined;
  private sessionId: string;
  public wrapperPlayList = "";

  constructor(masterUri: string, sessionId: string) {
    this.masterUri = masterUri;
    const split = masterUri.split("master.m3u8");
    this.endpoint = split[0];
    this.query = split[1];
    this.sessionId = sessionId;
  }

  public async load() {
    const hlsUriList = await this.loadPlayList();
    this.wrapperPlayList = this.createWrapperPlayList(hlsUriList.playlist);
    return this.createWrapperMaster(hlsUriList.master);
  }

  private async loadPlayList(): Promise<{
    master: string[];
    playlist: {
      hlsUri: string;
      inf: string;
    }[];
  }> {
    const res = await fetch(this.masterUri);
    const text = await res.text();

    const splited = text.split("\n");
    this.playlistUri = splited[2];

    const playlistRes = await fetch(this.endpoint + this.playlistUri);
    const playlistText = await playlistRes.text();

    const splitPlaylist = playlistText.split("\n");

    const hlsUriList = splitPlaylist.filter((line) => {
      return line.match(/^[0-9]*\.ts/) !== null;
    });

    const infList = splitPlaylist.filter((line) => {
      return line.match(/^#EXTINF/) !== null;
    });

    return {
      master: splited,
      playlist: hlsUriList.map((hlsUri, index) => {
        return {
          hlsUri,
          inf: infList[index],
        };
      }),
    };
  }

  private createWrapperPlayList(
    hlsUriList: {
      hlsUri: string;
      inf: string;
    }[]
  ) {
    const playListTextLines = [
      "#EXTM3U",
      "#EXT-X-VERSION:3",
      "#EXT-X-TARGETDURATION:6",
      "#EXT-X-MEDIA-SEQUENCE:1",
      "#EXT-X-PLAYLIST-TYPE:VOD",
      "",
    ];

    hlsUriList.forEach(async ({ hlsUri, inf }) => {
      playListTextLines.push(...[inf, "ts/" + this.sessionId + "/" + hlsUri]);
    });

    playListTextLines.push(...["#EXT-X-ENDLIST", ""]);
    return playListTextLines.join("\n");
  }

  private createWrapperMaster(masterLines: string[]) {
    masterLines[2] = "playlist/" + this.sessionId;
    return masterLines.join("\n");
  }
}
