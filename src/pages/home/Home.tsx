import Carousel from "../../components/carousel.tsx/Carousel";
import CategorySection from "../../components/categorySection/CategorySection";
import Trending from "../../components/trending/Trending";

function Home() {
  return (
    <div>
      <Carousel />
      <CategorySection />
      <Trending />
    </div>
  );
}

export default Home;
