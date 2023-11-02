/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-css-variables": {
      preserve: (declaration) => {
        if (
          declaration.value.includes("--yarl__") ||
          declaration.value.includes("--font-text")
        ) {
          return true;
        }
        return false;
      },
    },
    "postcss-calc": {
      preserve: true,
    },
    "postcss-preset-env": {},
    cssnano: {},
  },
};

module.exports = config;
