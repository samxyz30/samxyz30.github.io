export default (cfg) => {
  cfg.addPassthroughCopy({ "public": "/" });
  
  cfg.addCollection("posts", (api) => api.getFilteredByTag("posts").reverse());
  cfg.addFilter("todate", (dateObj) => {
    return dateObj.toDateString();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist",
    }
  };
};
