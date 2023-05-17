export interface InitialWatchDataType {
  ads: null;
  category: null;
  channel: null;
  client: Client;
  comment: Comment;
  community: null;
  easyComment: EasyComment;
  external: External;
  genre: Genre;
  marquee: Marquee;
  media: Media;
  okReason: string;
  owner: VideoOwner;
  payment: Payment;
  pcWatchPage: PCWatchPage;
  player: Player;
  ppv: null;
  ranking: Ranking;
  series: Series;
  smartphone: null;
  system: System;
  tag: Tag;
  video: Video;
  videoAds: VideoAds;
  videoLive: null;
  viewer: Viewer;
  waku: Waku;
}

export interface VideoOwner {
  channel: null;
  iconUrl: string;
  id: number;
  isMylistsPublic: boolean;
  isVideosPublic: boolean;
  live: null;
  nickname: string;
  videoLiveNotice: null;
  viewer: { isFollowing: boolean };
}

export interface Client {
  nicosid: string;
  watchId: string;
  watchTrackId: string;
}

export interface Comment {
  server: Server;
  keys: Keys;
  layers: Layer[];
  threads: Thread[];
  ng: Ng;
  isAttentionRequired: boolean;
  nvComment: NvComment;
}

export interface Keys {
  userKey: string;
}

export interface Layer {
  index: number;
  isTranslucent: boolean;
  threadIds: ThreadID[];
}

export interface ThreadID {
  id: number;
  fork: number;
  forkLabel: string;
}

export interface Ng {
  ngScore: NgScore;
  channel: any[];
  owner: any[];
  viewer: NgViewer;
}

export interface NgScore {
  isDisabled: boolean;
}

export interface NgViewer {
  revision: number;
  count: number;
  items: ViewerItem[];
}

export interface ViewerItem {
  type: Type;
  source: string;
  registeredAt: Date;
}

export enum Type {
  Command = "command",
  Word = "word",
}

export interface NvComment {
  threadKey: string;
  server: string;
  params: Params;
}

export interface Params {
  targets: Target[];
  language: string;
}

export interface Target {
  id: string;
  fork: string;
}

export interface Server {
  url: string;
}

export interface Thread {
  id: number;
  fork: number;
  forkLabel: string;
  videoId: string;
  isActive: boolean;
  isDefaultPostTarget: boolean;
  isEasyCommentPostTarget: boolean;
  isLeafRequired: boolean;
  isOwnerThread: boolean;
  isThreadkeyRequired: boolean;
  threadkey: null;
  is184Forced: boolean;
  hasNicoscript: boolean;
  label: string;
  postkeyStatus: number;
  server: string;
}

export interface EasyComment {
  phrases: Phrase[];
}

export interface Phrase {
  text: string;
  nicodic: Nicodic;
}

export interface Nicodic {
  title: string;
  viewTitle: string;
  summary: string;
  link: string;
}

export interface External {
  commons: Commons;
  ichiba: Ichiba;
}

export interface Commons {
  hasContentTree: boolean;
}

export interface Ichiba {
  isEnabled: boolean;
}

export interface Genre {
  key: string;
  label: string;
  isImmoral: boolean;
  isDisabled: boolean;
  isNotSet: boolean;
}

export interface Marquee {
  isDisabled: boolean;
  tagRelatedLead: null;
}

export interface Media {
  delivery: Delivery;
  deliveryLegacy: null;
}

export interface Delivery {
  recipeId: string;
  encryption: null;
  movie: Movie;
  storyboard: null;
  trackingId: string;
}

export interface Movie {
  contentId: string;
  audios: Audio[];
  videos: VideoElement[];
  session: Session;
}

export interface Audio {
  id: string;
  isAvailable: boolean;
  metadata: AudioMetadata;
}

export interface AudioMetadata {
  bitrate: number;
  samplingRate: number;
  loudness: Loudness;
  levelIndex: number;
  loudnessCollection: LoudnessCollection[];
}

export interface Loudness {
  integratedLoudness: number;
  truePeak: number;
}

export interface LoudnessCollection {
  type: string;
  value: number;
}

export interface Session {
  recipeId: string;
  playerId: string;
  videos: string[];
  audios: string[];
  movies: any[];
  protocols: string[];
  authTypes: AuthTypes;
  serviceUserId: string;
  token: string;
  signature: string;
  contentId: string;
  heartbeatLifetime: number;
  contentKeyTimeout: number;
  priority: number;
  transferPresets: any[];
  urls: URL[];
}

export interface AuthTypes {
  http: string;
  hls: string;
}

export interface URL {
  url: string;
  isWellKnownPort: boolean;
  isSsl: boolean;
}

export interface VideoElement {
  id: string;
  isAvailable: boolean;
  metadata: VideoMetadata;
}

export interface VideoMetadata {
  label: string;
  bitrate: number;
  resolution: Resolution;
  levelIndex: number;
  recommendedHighestAudioLevelIndex: number;
}

export interface Resolution {
  width: number;
  height: number;
}

export interface Payment {
  video: PaymentVideo;
  preview: Preview;
}

export interface Preview {
  ppv: Ichiba;
  admission: Ichiba;
  continuationBenefit: Ichiba;
  premium: Ichiba;
}

export interface PaymentVideo {
  isPpv: boolean;
  isAdmission: boolean;
  isContinuationBenefit: boolean;
  isPremium: boolean;
  watchableUserType: string;
  commentableUserType: string;
}

export interface PCWatchPage {
  tagRelatedBanner: null;
  videoEnd: VideoEnd;
  showOwnerMenu: boolean;
  showOwnerThreadCoEditingLink: boolean;
  showMymemoryEditingLink: boolean;
  creatorSupportRegistrationLabel: string;
}

export interface VideoEnd {
  bannerIn: null;
  overlay: null;
}

export interface Player {
  initialPlayback: InitialPlayback;
  comment: PlayerComment;
  layerMode: number;
}

export interface PlayerComment {
  isDefaultInvisible: boolean;
}

export interface InitialPlayback {
  type: string;
  positionSec: null;
}

export interface Ranking {
  genre: null;
  popularTag: any[];
}

export interface Series {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  video: SeriesVideo;
}

export interface SeriesVideo {
  prev: First;
  next: First;
  first: First;
}

export interface First {
  type: string;
  id: string;
  title: string;
  registeredAt: Date;
  count: Count;
  thumbnail: FirstThumbnail;
  duration: number;
  shortDescription: string;
  latestCommentSummary: string;
  isChannelVideo: boolean;
  isPaymentRequired: boolean;
  playbackPosition: null;
  owner: Owner;
  requireSensitiveMasking: boolean;
  videoLive: null;
  isMuted: boolean;
  "9d091f87": boolean;
  acf68865: boolean;
}

export interface Count {
  view: number;
  comment: number;
  mylist: number;
  like: number;
}

export interface Owner {
  ownerType: string;
  type: string;
  visibility: string;
  id: string;
  name: null;
  iconUrl: null;
}

export interface FirstThumbnail {
  url: string;
  middleUrl: string;
  largeUrl: string;
  listingUrl: string;
  nHdUrl: string;
}

export interface System {
  serverTime: Date;
  isPeakTime: boolean;
}

export interface Tag {
  items: TagItem[];
  hasR18Tag: boolean;
  isPublishedNicoscript: boolean;
  edit: Edit;
  viewer: Edit;
}

export interface Edit {
  isEditable: boolean;
  uneditableReason: null;
  editKey: string;
}

export interface TagItem {
  name: string;
  isCategory: boolean;
  isCategoryCandidate: boolean;
  isNicodicArticleExists: boolean;
  isLocked: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  count: Count;
  duration: number;
  thumbnail: VideoThumbnail;
  rating: Rating;
  registeredAt: Date;
  isPrivate: boolean;
  isDeleted: boolean;
  isNoBanner: boolean;
  isAuthenticationRequired: boolean;
  isEmbedPlayerAllowed: boolean;
  isGiftAllowed: boolean;
  viewer: VideoViewer;
  watchableUserTypeForPayment: string;
  commentableUserTypeForPayment: string;
  "9d091f87": boolean;
}

export interface Rating {
  isAdult: boolean;
}

export interface VideoThumbnail {
  url: string;
  middleUrl: string;
  largeUrl: string;
  player: string;
  ogp: string;
}

export interface VideoViewer {
  isOwner: boolean;
  like: Like;
}

export interface Like {
  isLiked: boolean;
  count: null;
}

export interface VideoAds {
  additionalParams: VideoAdsAdditionalParams;
  items: VideoAdsItem[];
  reason: string;
}

export interface VideoAdsAdditionalParams {
  videoId: string;
  videoDuration: number;
  isAdultRatingNG: boolean;
  isAuthenticationRequired: boolean;
  isR18: boolean;
  nicosid: string;
  lang: string;
  watchTrackId: string;
  genre: string;
  gender: string;
  age: number;
}

export interface VideoAdsItem {
  type: string;
  timingMs: null;
  additionalParams: ItemAdditionalParams;
}

export interface ItemAdditionalParams {
  linearType: string;
  adIdx: number;
  skipType: number;
  skippableType: number;
  pod: number;
}

export interface Viewer {
  id: number;
  nickname: string;
  isPremium: boolean;
  existence: Existence;
}

export interface Existence {
  age: number;
  prefecture: string;
  sex: string;
}

export interface Waku {
  information: null;
  bgImages: any[];
  addContents: null;
  addVideo: null;
  tagRelatedBanner: TagRelatedBanner;
  tagRelatedMarquee: TagRelatedMarquee;
}

export interface TagRelatedBanner {
  title: string;
  imageUrl: string;
  description: string;
  isEvent: boolean;
  linkUrl: string;
  linkType: string;
  linkOrigin: string;
  isNewWindow: boolean;
}

export interface TagRelatedMarquee {
  title: string;
  linkUrl: string;
  linkType: string;
  linkOrigin: string;
  isNewWindow: boolean;
}
