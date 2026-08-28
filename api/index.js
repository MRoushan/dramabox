import DramaboxClient from "../src/index.js";

const client = new DramaboxClient({
  language: "en",
  timeout: 30000,
  maxRetries: 3,
  requestDelay: 1000
});

export default async function handler(req, res) {
  try {
    const { path } = req.query;

    switch (path) {
      case "latest":
        return res.status(200).json(
          await client.getLatest(Number(req.query.page || 1))
        );

      case "vip":
        return res.status(200).json(
          await client.getVip()
        );

      case "homepage":
        return res.status(200).json(
          await client.getHomepage()
        );

      case "trending":
        return res.status(200).json(
          await client.getTrending()
        );

      case "recommend":
        return res.status(200).json(
          await client.getRecommendedBooks()
        );

      case "foryou":
        return res.status(200).json(
          await client.getForYou(Number(req.query.page || 1))
        );

      case "comingsoon":
        return res.status(200).json(
          await client.getComingSoon()
        );

      case "popular":
        return res.status(200).json(
          await client.getPopularSearch()
        );

      case "categories":
        return res.status(200).json(
          await client.getCategories(
            Number(req.query.page || 1),
            Number(req.query.pageSize || 30)
          )
        );

      case "category":
        return res.status(200).json(
          await client.getBooksByCategory(
            Number(req.query.typeTwoId || 0),
            Number(req.query.page || 1),
            Number(req.query.pageSize || 10)
          )
        );

      case "search":
        return res.status(200).json(
          await client.searchDrama(
            req.query.keyword,
            Number(req.query.page || 1),
            Number(req.query.pageSize || 20)
          )
        );

      case "suggest":
        return res.status(200).json(
          await client.suggestSearch(req.query.keyword)
        );

      case "detail":
        return res.status(200).json(
          await client.getDramaDetail(req.query.bookId)
        );

      case "chapters":
        return res.status(200).json(
          await client.getChapters(req.query.bookId)
        );

      case "episode":
        return res.status(200).json(
          await client.getEpisodeDetails(
            req.query.bookId,
            Number(req.query.episode)
          )
        );

      case "stream":
        return res.status(200).json(
          await client.getStreamUrl(
            req.query.bookId,
            Number(req.query.episode)
          )
        );

      case "related":
        return res.status(200).json(
          await client.getRelatedDramas(req.query.bookId)
        );

      case "random":
        return res.status(200).json(
          await client.getRandomDrama()
        );

      case "batch":
        return res.status(200).json(
          await client.batchDownload(req.query.bookId)
        );

      case "ping":
        return res.status(200).json(
          await client.ping()
        );

      case "config":
        return res.status(200).json(
          client.getConfig()
        );

      case "cache":
        return res.status(200).json(
          client.getCacheStats()
        );

      default:
        return res.status(400).json({
          success: false,
          error: "Unknown endpoint",
          available: [
            "latest",
            "vip",
            "homepage",
            "trending",
            "recommend",
            "foryou",
            "comingsoon",
            "popular",
            "categories",
            "category",
            "search",
            "suggest",
            "detail",
            "chapters",
            "episode",
            "stream",
            "related",
            "random",
            "batch",
            "ping",
            "config",
            "cache"
          ]
        });
    }
  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      success: false,
      error: {
        message: error?.message || "Internal server error",
        name: error?.name || "Error"
      }
    });
  }
}
