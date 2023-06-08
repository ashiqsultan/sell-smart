import PostList from '../components/PostList/PostList';
import StateSelector from '../components/Selectors/StateSelector';
import CitySelector from '../components/Selectors/CitySelector';
import Category from '../components/Selectors/Category';
import PriceMinMaxField from '../components/PriceRangeTextField';
import {
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
} from '@mui/material';
import FilterIcon from '@mui/icons-material/FilterAlt';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Home() {
  const { dispatch } = useContext(AppContext);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box
              display={'flex'}
              flexDirection={'column'}
              rowGap={'1rem'}
              p={2}
            >
              <Grid
                container
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='h6'>Filter Posts</Typography>
                <Button
                  variant='outlined'
                  color='info'
                  endIcon={<FilterIcon />}
                  onClick={() => {
                    dispatch({ type: 'CLEAR_FILTERS' });
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>

              <Category />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <StateSelector />
                </Grid>
                <Grid item xs={6}>
                  <CitySelector />
                </Grid>
              </Grid>
              {/* <Grid container>
                <Grid item xs={6}>
                  <PriceMinMaxField isMinPrice={true} />
                </Grid>
                <Grid item xs={6}>
                  <PriceMinMaxField isMinPrice={false} />
                </Grid>
              </Grid> */}
            </Box>
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
