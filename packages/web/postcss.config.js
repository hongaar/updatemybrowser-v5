/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-css-variables": {},
    "postcss-calc": {},
    "postcss-preset-env": {},
    cssnano: {},
  },
};

module.exports = config;
