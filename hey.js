module.exports = {
  root: "build",
  webpack: {
    umd: {
      entry: "./src/index.js",
      library: "validator",
      filename: 'validator.js'
    }
  }
};
