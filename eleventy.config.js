import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default (cfg) => {
  cfg.addPassthroughCopy({ "public": "/" });
  
  cfg.addCollection("posts", (api) => api.getFilteredByTag("posts").reverse());
  cfg.addFilter("todate", (dateObj) => {
    return dateObj.toDateString();
  });
  
  cfg.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src",
      includes: "_includes",
    }
  };
};
