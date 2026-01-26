import Carousel from "../../components/carousel.tsx/Carousel";
import CategorySection from "../../components/categorySection/CategorySection";
import Trending from "../../components/trending/Trending";
import { useAppSelector } from "../../hooks/hook";

function Home() {
  const { user } = useAppSelector((state) => state.auth);
  console.log("user from Home is : ", user);
  return (
    <div>
      <Carousel />
      <CategorySection />
      <Trending />
    </div>
  );
}

export default Home;
