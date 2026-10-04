const DEFAULT_BACKEND_ORIGIN =
  "https://smart-q-backend-nestjs.onrender.com";

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

const configuredApiUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  `${DEFAULT_BACKEND_ORIGIN}/api`;

export const BACKEND_API_URL = trimTrailingSlashes(configuredApiUrl);

export const BACKEND_SOCKET_URL = trimTrailingSlashes(
  process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL ??
    BACKEND_API_URL.replace(/\/api$/, ""),
);
