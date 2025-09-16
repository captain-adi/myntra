import Carousel from "../../components/carousel.tsx/Carousel";
import CategorySection from "../../components/categorySection/CategorySection";
import Trending from "../../components/trending/Trending";
import { useAuth } from "../../context/AuthContext";

function Home() {
  const { user } = useAuth();
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
