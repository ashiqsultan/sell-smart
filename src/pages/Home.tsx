import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';
import CitySelector from '../components/Selectors/CitySelector';
import Category from '../components/Selectors/Category';

function Home() {
  return (
    <>
      <Category />
      <StateSelector />
      <CitySelector />
      <PostList />
    </>
  );
}

export default Home;
