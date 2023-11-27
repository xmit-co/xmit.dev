module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "favicon.svg": "/favicon.svg" });
  eleventyConfig.addFilter(
    "dateDisplay",
    (date) => new Date(date).toISOString().split("T")[0],
  );
  return {
    dir: {
      output: "dist",
    },
  };
};
