export interface AppConfig {
  sampleHeight: number;
  longestSample: number;
  showIntro: boolean;
  showFPS: boolean;
  homePadding: number;
}

const appConfig = {
  sampleHeight: 40,
  longestSample: 5,
  showIntro: false,
  showFPS: false,
  // showFPS: false,
  homePadding: 20,
  devUseLocalVideos: true,
};

export default appConfig;
