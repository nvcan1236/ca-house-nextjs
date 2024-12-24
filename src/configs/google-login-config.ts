import envConfig from "./env-config";

const googleConfig = {
  auth_uri: envConfig.NEXT_PUBLIC_GOOGLE_AUTH_URI,
  token_uri: envConfig.NEXT_PUBLIC_GOOGLE_TOKEN_URI,
  redirect_uris: envConfig.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS,
  client_id: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

export default googleConfig;
