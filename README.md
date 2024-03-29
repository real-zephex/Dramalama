## Dramalama

Dramalama is an online service where you can watch kdramas and anime and read mangas for free.

<p align="center">
  <img width="300" height="300" src="https://github.com/real-zephex/Dramalama/assets/143923795/add2af15-7d1a-4185-8c48-c31be488d559">
</p>

## Description

This web application is written using Next.JS framework and fetches it data via [Consumet API](https://github.com/consumet/api.consumet.org). The anime section is mostly server rendered so you can expect some good performance out of it. However, kdrama is section is not server rendered as it was originally written in React and I just copy pasted the code from there to here.

*However, I am planning to rewrite the kdrama section and make it server rendered*

## Features

#### Kdrama
- User can search for dramas by their title
- Have tried to adapt to all screen sizes
- HLS streams, meaning the quality will adapt to your network conditions automatically.

#### Anime
- Top airing animes and recent episode releases are shown on the homepage.
- User can search for animes by their title.
- Due to server side rendering, the requests are cached meaning if you visit a specific episode of some anime and then try to revisit it again then it will constantly load. It can benefit other users who are trying to watch the same anime.
- [Vidstack](https://www.vidstack.io/) has been used as video player.

#### Manga
- Users can search for mangas/manhwa by their title
- A good looking info page
- Ability to download mangas in `.pdf` format

Alternatively, you can link your repository to vercel and have your very own streaming website.

## Content Guidelines

Dramalama doesn't stores any data. It fetches it data through Consumet API which in turns scrapes other websites to get that stream. If you have any problem, then try contacting the owner of those websites.

## Deployments

- Vercel: https://dramalama.vercel.app
- Netlify: https://dramalama.netlify.app
- Koyeb: https://dramalama-zephex.koyeb.app

## Contributing

Contributors are welcome!!


