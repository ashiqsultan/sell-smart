import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';
import CitySelector from '../components/Selectors/CitySelector';
import Category from '../components/Selectors/Category';
import PriceMinMaxField from '../components/PriceRangeTextField';

function Home() {
  return (
    <>
      <Category />
      <StateSelector />
      <CitySelector />
      <PriceMinMaxField isMinPrice={true} />
      <PriceMinMaxField isMinPrice={false} />
      <PostList />
    </>
  );
}

export default Home;
