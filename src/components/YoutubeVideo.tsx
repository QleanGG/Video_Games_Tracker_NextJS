interface YouTubeVideoProps {
    videoId: string;
    title: string;
  }
  
  const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title }) => {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default YouTubeVideo;
  