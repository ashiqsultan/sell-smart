import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';

function Home() {
  return (
    <>
      <StateSelector />
      <PostList />
    </>
  );
}

export default Home;
