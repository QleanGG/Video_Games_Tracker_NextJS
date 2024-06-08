import HeroSection from '../components/HeroSection';
import FeaturedGames from '../components/FeaturedGames';
import CallToAction from '@/components/CallToAction';
import Head from 'next/head';
// import UserReviews from '../components/UserReviews';

const HomePage = () => {
  return (
    <>
      <Head><title>Game Vault</title></Head>
      <HeroSection />
      <FeaturedGames />
      <CallToAction />
    </>
  );
};

export default HomePage;
