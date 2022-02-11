import Connection from "./Connection";

export type TrackCategory = "remix" | "recital" | "none";
type Composer = "Ysaÿe" | "Bartók" | "Bach";

export interface Track {
  id: string;
  artist?: string;
  title: string;
  src: string;
  position: number;
  playing: boolean;
  audioSrc?: string;
  visualType?: "image" | "video";
  samples?: Composer[];
  visual?: string;
  link?: string;
  about?: string;
  node?: MediaElementAudioSourceNode;
  connections?: Connection[];
  // elementId: string;
  category: "remix" | "recital" | "none";
  startTime?: number;
  bio?: string;
  duration?: number;
  bpm?: number;
  origin?: string;
  composer?: string;
  performer?: string;
  year?: string;
  composition?: string;
  video?: string;
  localVideo?: string;
  iOSVideo?: string;
  movements?: number[];

}
