import BestSeller from "../components/BestSeller";
import LatestCollection from "../components/LatestCollection";
import NewsLetter from "../components/NewsLetter";
import OurPolicy from "../components/OurPolicy";
import Slide from "../components/Slide";

function HomePage() {
  return (
    <>
      <Slide />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </>
  );
}

export default HomePage;
