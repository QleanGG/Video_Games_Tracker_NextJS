import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { useYouTubeVideos } from '@/hooks/useYoutubevideos';
import YouTubeVideo from '@/components/YoutubeVideo';

interface YouTubeVideosProps {
  gameTitle: string;
}

const YouTubeVideos: React.FC<YouTubeVideosProps> = ({ gameTitle }) => {
  const { data: videos, isLoading: isLoadingVideos, error: videoError } = useYouTubeVideos(gameTitle);

  if (isLoadingVideos) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  if (videoError) {
    return <Typography color="error">Error fetching videos</Typography>;
  }

  const mainVideo = videos?.[0];
  const suggestedVideos = videos?.slice(1, 3);

  return (
    <>
      {mainVideo && (
        <YouTubeVideo
          key={mainVideo.id.videoId}
          videoId={mainVideo.id.videoId}
          title={mainVideo.snippet.title}
        />
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Suggested Videos</Typography>
        {suggestedVideos && suggestedVideos.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 10 }}>
            {suggestedVideos.map((video) => (
              <Box key={video.id.videoId} sx={{ width: '50%' }}>
                <YouTubeVideo
                  videoId={video.id.videoId}
                  title={video.snippet.title}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No suggested videos available.</Typography>
        )}
      </Box>
    </>
  );
};

export default YouTubeVideos;
