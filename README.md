# Dramalama

## Introduction
Dramalama is a web application designed to provide detailed information about various entertainment media including Anime, K-Dramas, Movies, and Web Series. The application fetches data from various sources and displays it in an organized and user-friendly manner.

## Features
- Detailed information pages for Anime, K-Dramas, Movies, and Web Series.
- Search functionality for finding specific media.
- Pre-fetching of video links for optimized performance.
- User-friendly interface with responsive design.

## Technologies Used
- **Framework:** Next.js
- **Styling:** CSS, NextUI

## Data Sources
Dramalama fetches data from multiple APIs to provide comprehensive and up-to-date information on various entertainment media.

### Anime
- **API:** [Consumet](https://github.com/consumet/api.consumet.org)


### K-Dramas
- **API:** [Dramacool API](https://dramacool-scraper.vercel.app) and [Consumet](https://github.com/consumet/api.consumet.org)
- Endpoints:
  - Popular: `/popular`
  - Recent: `/recent`


### Movies and Series
- **API:** [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

## Setup Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

#### Demo
Live demo is available at [Dramalama - Vercel](https://dramalama.vercel.app) and [Dramalama - Netlify](https://dramalama.netlify.app)

*Using the netlify one is recommended*

## License
This project is licensed under the MIT License.
