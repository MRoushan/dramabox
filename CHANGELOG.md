# Changelog

---

### v0.0.2

#### Breaking Changes
- Complete rewrite with modular architecture - ESM first with CJS and browser builds

#### Added
- Modular architecture: `src/core/`, `src/client/`, `src/utils/`, `src/types/`
- Better error handling with improved messages and retry logic
- Built-in rate limiting to prevent API throttling
- Separate token cache with auto-refresh
- New methods: `getForYou()`, `getDubIndo()`, `getRandomDrama()`, `getComingSoon()`, `getPopularSearch()`, `getTrending()`, `getHomepage()`, `getRelatedDramas()`, `getEpisodeDetails()`, `advancedSearch()`, `getDramaDetailV2()`
- Batch download with progress tracking
- Multiple build formats: ESM, CJS, and browser (IIFE)
- TypeScript definitions
- Response examples auto-saved to `response_examples/`

#### Fixed
- Fixed 403 errors on token generation by matching TLS/cipher requirements
- Fixed `getDramaDetail()` returning "Drama not found" for IDs not indexed - now falls back to v2 endpoint
- Fixed `getRelatedDramas()` failing as side effect of detail errors
- Fixed `getStreamUrl()` depending on dead `regexd.com` domain - now pulls from chapters endpoint directly
- Fixed caching bug in `getDramaDetailV2()` - empty responses no longer poison cache for 10 minutes
- Fixed corrupted import line in `src/index.js`
- Fixed build scripts pointing to missing files
- Fixed browser build failing to bundle
- Fixed `client.getToken()` not being defined
- HTTP client now decompresses gzip/br/deflate responses and gives clearer errors instead of crashing on `JSON.parse`
- Token requests now retry on failure instead of failing immediately
- Signature generation updated to match latest API requirements

#### Changed
- Replaced `axios` with native HTTP client
- Enhanced headers - complete header set matching official app
- Better retry logic with exponential backoff
- Updated dependencies: `cheerio@1.2.0`, `mime-types@3.0.2`, `set-cookie-parser@3.1.2`, `tough-cookie@6.0.2`, `ansi-styles@7.0.0`, `chalk@6.0.0`, `commander@15.0.0`, `he@1.2.0`, `iconv-lite@0.6.3`

#### Deprecated
- `regexd.com` and everything built on it - domain no longer resolves; will be removed in future major version
- `m3u8` field on `getStreamUrl()` response - permanently `null` (only came from regexd.com); `mp4` still works

#### Security
- Improved private key handling
- Better request validation
- Enhanced error sanitization

#### Known Issues
- `getDramaDetail()` / `getRelatedDramas()` may return "Drama not found" for some bookIds that appear in listings - both v1 and v2 endpoints sometimes lack records for certain IDs (gap on Dramabox's side, not library bug). Retry later if hitting this on a specific ID.

---

### v0.0.1 - 2026-01-19

#### Added
- Initial release
- Basic Dramabox scraper functionality
- Token generation and management
- Core methods:
  - `getLatest()` - fetch latest dramas
  - `getVip()` - fetch VIP dramas
  - `getDramaDetail()` - get drama details
  - `getChapters()` - get episode list
  - `getStreamUrl()` - get streaming URL
  - `getDramaList()` - get drama list
  - `getCategories()` - get categories
  - `getBooksByCategory()` - get books by category
  - `getRecommendedBooks()` - get recommendations
  - `searchDramaIndex()` - search index
  - `searchDrama()` - search dramas
  - `suggestSearch()` - search suggestions
  - `batchDownload()` - batch download episodes
  - `ping()` - test connection
  - `getConfig()` - get configuration
  - `clearCache()` - clear cache
  - `getCacheStats()` - get cache statistics
- Axios-based HTTP client
- NodeCache for caching
- RSA-SHA256 signing
- Rate limiting
- Multi-language support (default: Indonesian)
- TypeScript support
- ESM and CJS builds
- Browser bundle

#### Dependencies
- axios ^1.13.2
- cheerio ^1.1.2
- https-proxy-agent ^7.0.6
- node-cache ^5.1.2
- socks-proxy-agent ^8.0.5