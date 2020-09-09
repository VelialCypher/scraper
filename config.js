// npm start size uploads chache

// Globals
export const TYPE_CONTENT = /image\//gi;
export const MIN_BYTES_SIZE = Number(process.argv[2]) || 15_000;
export const NUMBER_OF_UPLOADS = Number(process.argv[3]) || 20;
export const CACHED_DUMMY_URL = Boolean(process.argv[4]) || true;

// Paths

const STORE = "./output";

export const UPLOAD_PATH = STORE + "/uploads/";
export const CACHE_PATH = STORE +  "/cache/";

// Main parse url
export const PARSED_URL = "https://i.imgur.com/";