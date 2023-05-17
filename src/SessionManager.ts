import { InitialWatchDataType } from "./api/apiTypes/intialWatchData";
import { type SessionResponse } from "./api/apiTypes/session";
import getInitialWatchData from "./api/getInitialWatchData";
import getSession from "./api/getSession";
import sendSession from "./api/sendSession";
import { randomUUID } from "crypto";
import { HLSLoader } from "./hlsLoader";

export class SessionManager {
  private sessions: { [sessionId: string]: Session } = {};

  constructor() {
    this.autoDisconnect();
  }

  public async create(videoId: `sm${string}`): Promise<string> {
    const session = new Session(videoId);
    await session.activate();
    const sessionId = randomUUID();

    this.sessions[sessionId] = session;
    console.log(sessionId);
    return sessionId;
  }

  public heatbeat(sessionId: string) {
    const session = this.sessions[sessionId];

    if (session !== undefined) {
      session.heatBeat();
    }
  }

  private autoDisconnect() {
    setInterval(() => {
      Object.keys(this.sessions).forEach((sessionId) => {
        const session = this.sessions[sessionId];
        const now = new Date();

        if (session.lastAccessDate !== undefined) {
          if (now.getTime() - session.lastAccessDate?.getTime() > 40 * 1000) {
            delete this.sessions[sessionId];
          }
        }
      });
    }, 3000);
  }

  public get(id: string): Session | undefined {
    return this.sessions[id];
  }
}

export class Session {
  public initialWatchData: InitialWatchDataType | undefined;
  public sessionData: SessionResponse | undefined;
  public videoId: `sm${string}`;
  public lastAccessDate: Date | undefined;
  public hlsLoader: HLSLoader | undefined;

  constructor(videoId: `sm${string}`) {
    this.videoId = videoId;

    this.updateAccessDate();
  }

  public async activate() {
    const initialWatchData = await getInitialWatchData(this.videoId);
    if (initialWatchData !== null) {
      this.initialWatchData = initialWatchData;
      this.sessionData = await getSession(initialWatchData);
      this.updateAccessDate();
    }
  }

  public heatBeat() {
    if (this.sessionData !== undefined) {
      sendSession(this.sessionData);
      this.updateAccessDate();
    }
  }

  private updateAccessDate() {
    this.lastAccessDate = new Date();
  }

  public setHLSLoader(loader: HLSLoader) {
    this.hlsLoader = loader;
  }
}
