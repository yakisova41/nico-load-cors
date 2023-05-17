export interface SessionResponse {
  data: SessionData;
  meta: SessionMeta;
}

export interface SessionMeta {
  message: string;
  status: number;
}

export interface SessionData {
  session: Session;
}

export interface Session {
  id: string;
  recipe_id: string;
  content_id: string;
  content_src_id_sets: ContentSrcIDSet[];
  content_type: string;
  timing_constraint: string;
  keep_method: KeepMethod;
  protocol: Protocol;
  play_seek_time: number;
  play_speed: number;
  play_control_range: PlayControlRange;
  content_uri: string;
  session_operation_auth: SessionOperationAuth;
  content_auth: ContentAuth;
  runtime_info: RuntimeInfo;
  client_info: ClientInfo;
  created_time: number;
  modified_time: number;
  priority: number;
  content_route: number;
  version: string;
  content_status: string;
}

export interface PlayControlRange {
  max_play_speed: number;
  min_play_speed: number;
}

export interface RuntimeInfo {
  node_id: string;
  execution_history: any[];
  thumbnailer_state: any[];
}

export interface ClientInfo {
  player_id: string;
}

export interface ContentAuth {
  auth_type: string;
  content_key_timeout: number;
  service_id: string;
  service_user_id: string;
}

export interface ContentSrcIDSet {
  content_src_ids: ContentSrcID[];
}

export interface ContentSrcID {
  src_id_to_mux: SrcIDToMux;
}

export interface SrcIDToMux {
  video_src_ids: string[];
  audio_src_ids: string[];
}

export interface KeepMethod {
  heartbeat: Heartbeat;
}

export interface Heartbeat {
  lifetime: number;
}

export interface Protocol {
  name: string;
  parameters: ProtocolParameters;
}

export interface ProtocolParameters {
  http_parameters: HTTPParameters;
}

export interface HTTPParameters {
  parameters: HTTPParametersParameters;
}

export interface HTTPParametersParameters {
  hls_parameters: HLSParameters;
}

export interface HLSParameters {
  use_well_known_port: string;
  use_ssl: string;
  transfer_preset: string;
  segment_duration: number;
}

export interface SessionOperationAuth {
  session_operation_auth_by_signature: SessionOperationAuthBySignature;
}

export interface SessionOperationAuthBySignature {
  token: string;
  signature: string;
}
