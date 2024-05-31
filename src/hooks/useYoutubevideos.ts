import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
  };
}

const fetchYouTubeVideos = async (gameTitle: string): Promise<YouTubeVideo[]> => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(gameTitle)}&key=${apiKey}`;
  
    const { data } = await axios.get(apiUrl);
    return data.items;
  };
  
  export const useYouTubeVideos = (gameTitle: string) => {
    return useQuery<YouTubeVideo[], Error>({
      queryKey: ['youtubeVideos', gameTitle],
      queryFn: () => fetchYouTubeVideos(gameTitle),
      enabled: !!gameTitle,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };