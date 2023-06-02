import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';
import CitySelector from '../components/Selectors/CitySelector';

function Home() {
  return (
    <>
      <StateSelector />
      <CitySelector />
      <PostList />
    </>
  );
}

export default Home;
