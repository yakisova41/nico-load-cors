import express from "express";
import cors from "cors";
import { SessionManager } from "./SessionManager";
import { HLSLoader, loadPlayList } from "./hlsLoader";
import fetch from "node-fetch";

function main() {
  const app = express();
  app.set("port", process.env.PORT || 5173);
  app.use(cors());

  const sessionManager = new SessionManager();

  app.get<{ videoId: `sm${string}` }>("/create/:videoId", async (req, res) => {
    const { videoId } = req.params;
    const sessionId = await sessionManager.create(videoId);

    res.send(sessionId);
  });

  app.get<{ sessionId: string }>("/heatbeat/:sessionId", (req, res) => {
    const { sessionId } = req.params;
    sessionManager.heatbeat(sessionId);
    res.send(200);
  });

  app.get<{ sessionId: string }>("/getHLS/:sessionId", async (req, res) => {
    const { sessionId } = req.params;

    const session = sessionManager.get(sessionId);
    if (session !== undefined) {
      if (session.sessionData?.data.session?.content_uri !== undefined) {
        const loader = new HLSLoader(
          session.sessionData?.data.session?.content_uri,
          sessionId
        );

        session.setHLSLoader(loader);

        const master = await loader.load();

        res.set({ "content-type": "application/x-mpegURL" });
        res.send(master);
      }
    }
  });

  app.get<{ sessionId: string }>(
    "/getHLS/playlist/:sessionId",
    async (req, res) => {
      const { sessionId } = req.params;

      const session = sessionManager.get(sessionId);
      if (session !== undefined) {
        const loader = session.hlsLoader;

        res.set({ "content-type": "application/x-mpegURL" });

        if (loader !== undefined) {
          res.send(loader.wrapperPlayList);
        }
      }
    }
  );

  app.get<{ sessionId: string; tsUri: string }>(
    "/getHLS/playlist/ts/:sessionId/:tsUri",
    async (req, res) => {
      const { sessionId, tsUri } = req.params;

      const session = sessionManager.get(sessionId);

      if (session !== undefined) {
        const loader = session.hlsLoader;

        res.set({ "content-type": "video/MP2T" });

        if (loader !== undefined) {
          const url = loader.endpoint + "1/ts/" + tsUri + loader.query;

          const tsRes = await fetch(url);

          const arrBuffer = await tsRes.arrayBuffer();
          const buffer = Buffer.from(arrBuffer);
          res.send(buffer);
        }
      }
    }
  );

  app.listen(app.get("port"), () => {
    console.log("http://localhost:" + app.get("port"));
  });
}

main();
