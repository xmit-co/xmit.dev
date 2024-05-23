module.exports = function (cfg) {
  cfg.addPassthroughCopy("img");
  cfg.addFilter("rfc3339", (date) => new Date(date).toISOString());
  cfg.addFilter("stringify", (v) => JSON.stringify(v));
  cfg.addFilter(
    "dateDisplay",
    (date) => new Date(date).toISOString().split("T")[0],
  );
  cfg.setNunjucksEnvironmentOptions({
    autoescape: false,
  });
  return {
    dir: {
      output: "dist",
    },
  };
};
