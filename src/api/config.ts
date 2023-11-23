interface IAppConfig {
  baseURL: string;
}

const API_KEY = "b7f8098eb4c14a1cb3432cc9f3a00aa1"

const version = "v2";
const AppConfig: IAppConfig = {
  baseURL: `https://newsapi.org/${version}`,
};

export {
  AppConfig,
  API_KEY
};