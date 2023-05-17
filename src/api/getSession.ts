/* eslint-disable array-callback-return */
import type { InitialWatchDataType } from "./apiTypes/intialWatchData";
import type { SessionResponse } from "./apiTypes/session";
import fetch from "node-fetch";

export default async function getSession(
  initialWatchData: InitialWatchDataType
): Promise<SessionResponse> {
  const res = await fetch("https://api.dmc.nico/api/sessions?_format=json", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadGenerator(initialWatchData)),
  });
  const text = await res.text();
  const sessionRes: SessionResponse = JSON.parse(text);
  return sessionRes;
}

function payloadGenerator(initialWatchData: InitialWatchDataType): any {
  return {
    session: {
      recipe_id: "nicovideo-" + initialWatchData.video.id,
      content_id: "out1",
      content_type: "movie",
      content_src_id_sets: [
        {
          content_src_ids: [
            {
              src_id_to_mux: {
                audio_src_ids: initialWatchData.media.delivery.movie.audios
                  .filter(({ isAvailable }) => {
                    if (isAvailable) {
                      return true;
                    }
                  })
                  .map(({ id }) => {
                    return id;
                  }),
                video_src_ids: initialWatchData.media.delivery.movie.videos
                  .filter(({ isAvailable }) => {
                    if (isAvailable) {
                      return true;
                    }
                  })
                  .map(({ id }) => {
                    return id;
                  }),
              },
            },
          ],
        },
      ],
      timing_constraint: "unlimited",
      keep_method: { heartbeat: { lifetime: 120000 } },
      protocol: {
        name: "http",
        parameters: {
          http_parameters: {
            parameters: {
              hls_parameters: {
                use_well_known_port: "yes",
                use_ssl: "yes",
                transfer_preset: "",
                segment_duration: 6000,
              },
            },
          },
        },
      },
      content_uri: "",
      session_operation_auth: {
        session_operation_auth_by_signature: {
          token: initialWatchData.media.delivery.movie.session.token,
          signature: initialWatchData.media.delivery.movie.session.signature,
        },
      },
      content_auth: {
        auth_type: "ht2",
        content_key_timeout: 600000,
        service_id: "nicovideo",
        service_user_id:
          initialWatchData.media.delivery.movie.session.serviceUserId,
      },
      client_info: {
        player_id: initialWatchData.media.delivery.movie.session.playerId,
      },
      priority: 0,
    },
  };
}
