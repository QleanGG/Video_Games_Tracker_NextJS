import HeroSection from '../components/HeroSection';
import FeaturedGames from '../components/FeaturedGames';
import CallToAction from '@/components/CallToAction';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedGames />
      <CallToAction />
    </>
  );
};

export default HomePage;
