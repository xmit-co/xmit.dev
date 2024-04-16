module.exports = function (cfg) {
  cfg.addPassthroughCopy({ "favicon.svg": "/favicon.svg" });
  cfg.addPassthroughCopy("img");
  cfg.addFilter(
    "dateDisplay",
    (date) => new Date(date).toISOString().split("T")[0],
  );
  return {
    dir: {
      output: "dist",
    },
  };
};
