import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';
import CitySelector from '../components/Selectors/CitySelector';
import Category from '../components/Selectors/Category';
import PriceMinMaxField from '../components/PriceRangeTextField';
import { Grid, Card, CardContent } from '@mui/material';

function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Category />
            <StateSelector />
            <CitySelector />
            <Grid container>
              <Grid item xs={6}>
                <PriceMinMaxField isMinPrice={true} />
              </Grid>
              <Grid item xs={6}>
                <PriceMinMaxField isMinPrice={false} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <PostList />
      </Grid>
    </Grid>
  );
}

export default Home;
