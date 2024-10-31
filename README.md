Well, you need to host a lot of stuff to get this project up and running on your system.

It includes:
1. Aniwatch to Gogo Mapper - https://github.com/real-zephex/gogoToAniwatchFinal
2. Aniwatch API - https://github.com/ghoshRitesh12/aniwatch-api
3. Consumet API - https://github.com/consumet/api.consumet.org
4. Dramacool Scraper - https://github.com/real-zephex/dramacool-scraper
5. M3U8 Proxy (for playing streams) - https://github.com/Gratenes/m3u8CloudflareWorkerProxy
6. TMDB API KEY - https://www.themoviedb.org/
7. CORS Proxy (for loading images) - https://github.com/real-zephex/Good-Proxy

Create a `.env` or use your hosting settings section to define the following environmnetal variable

```
ANIWATCH_GOGO_MAPPER
ANIWATCH_URL
CONSUMET_API_URL
DRAMACOOL_SCRAPER
M3U8_PROXY
NEXT_PUBLIC_M3U8_PROXY
NEXT_PUBLIC_PROXY
NEXT_PUBLIC_PROXY_2
PROXY
TMDB_API_KEY
```

For the proxies, you need to include the `/?url=` parameter in the end.

Basically, you will have a very hard time hosting this site on your own. 

Thank you for your understanding
