module.exports = {
  resolve: {
    fallback: {
      "stream": require.resolve("path-browserify"),
    }
  }
};
