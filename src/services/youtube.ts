interface YouTubeVideo {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
    };
  }
  
  export async function fetchYouTubeVideos(gameTitle: string): Promise<YouTubeVideo[]> {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(gameTitle)}&key=${apiKey}`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    return data.items;
  }
  