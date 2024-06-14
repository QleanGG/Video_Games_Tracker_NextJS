import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, CardMedia, Button, CardActions } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../../styles/CarouselSlider.module.css'

interface CarouselSliderProps {
  games: Game[];
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const CarouselSlider: React.FC<CarouselSliderProps> = ({ games }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {games.map((game: Game, index: number) => (
        <Box 
          key={`${game.id}-${index}`} 
          sx={{ 
            padding: '0 8px', 
            boxSizing: 'border-box', 
            display: 'flex', 
            justifyContent: 'center',
          }}
        >
          <Card 
            sx={{ 
              height: 350, 
            //   width: 250, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <CardMedia sx={{ height: 150, position: 'relative' }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${game.imageUrl}`}
                alt={game.title}
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                loading="lazy"
              />
            </CardMedia>
            <CardContent>
              <Typography variant="h6" color={"text.secondary"}>{game.title}</Typography>
              <Typography variant="body2" color="text.primary">
                Rating: {game.rating}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Platforms: {game.platforms.map(platform => platform.name).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Genres: {game.genres.map(genre => genre.name).join(', ')}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Link href={`/games/${game.slug}`} passHref>
                <Button variant='contained' color='primary' size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default CarouselSlider;
