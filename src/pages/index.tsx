import Layout from '../components/layout';
import HeroSection from '../components/HeroSection';
import FeaturedGames from '../components/FeaturedGames';
import CallToAction from '@/components/CallToAction';
// import UserReviews from '../components/UserReviews';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedGames />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;
