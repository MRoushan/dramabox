const DramaboxClient = require("@zhadev/dramabox").default;

const client = new DramaboxClient({
  language: "en",
  version: "470",
  timeout: 30000,
  maxRetries: 3,
  cacheTTL: 300,
  requestDelay: 1000
});

module.exports = async (req, res) => {
  try {
    const { path, keyword, page = 1, bookId, episode } = req.query;

    let result;

    switch (path) {
      case "latest":
        result = await client.getLatest(Number(page));
        break;

      case "homepage":
        result = await client.getHomepage();
        break;

      case "trending":
        result = await client.getTrending();
        break;

      case "search":
        result = await client.searchDrama(
          keyword || "",
          Number(page),
          20
        );
        break;

      case "detail":
        result = await client.getDramaDetail(bookId);
        break;

      case "chapters":
        result = await client.getChapters(bookId);
        break;

      case "episode":
        result = await client.getEpisodeDetails(
          bookId,
          Number(episode)
        );
        break;

      case "stream":
        result = await client.getStreamUrl(
          bookId,
          Number(episode)
        );
        break;

      case "categories":
        result = await client.getCategories(
          Number(page),
          50
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid path. Use latest, homepage, trending, search, detail, chapters, episode, stream, or categories."
        });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
};
