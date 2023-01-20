import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}

export default Home;