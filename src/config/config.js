// config.js
const configArray = {
  development: {
    BACKEND_URL: import.meta.env.VITE_DEV_BACKEND_URL,
  },
  production: {
    BACKEND_URL: import.meta.env.VITE_PROD_BACKEND_URL,
  },
};

const currentEnv = import.meta.env.NODE_ENV || "development";

const config = {
  ...configArray[currentEnv],
};

export default config;
