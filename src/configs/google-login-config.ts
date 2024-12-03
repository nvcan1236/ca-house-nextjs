const googleConfig = {
  auth_uri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_GOOGLE_TOKEN_URI,
  redirect_uris: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URIS,
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

export default googleConfig;
