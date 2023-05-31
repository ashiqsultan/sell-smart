import { CSSProperties, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { create } from '../api/posts';
import Category from './Selectors/Category';
import StateSelector from './Selectors/StateSelector';
import CitySelector from './Selectors/CitySelector';

const styles: Record<string, CSSProperties> = {
  formContainer: { marginTop: '1rem', padding: '0 1rem' },
  formItem: { marginBottom: '1rem' },
};
const CreatePostForm = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePost = async () => {
    try {
      const result = await create(
        category,
        title,
        parseInt(price),
        state,
        city,
        description
      );
      console.log(result);
      // Handle success or show a success message
    } catch (error) {
      console.error(error);
      // Handle error or show an error message
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId);
  };
  const handleStateChange = (stateId: string) => {
    setState(stateId);
    setCity(''); // Reset selected city when the state changes
  };

  const handleCityChange = (cityId: string) => {
    setCity(cityId);
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formItem}>
        <Typography variant='h6'>Create a New Post</Typography>
      </div>
      <div style={styles.formItem}>
        <Category onChange={handleCategoryChange} />
      </div>
      <TextField
        label='Title'
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.formItem}
      />
      <TextField
        label='Price'
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type='number'
        style={styles.formItem}
      />
      <div style={styles.formItem}>
        <StateSelector onChange={handleStateChange} />
      </div>
      <div style={styles.formItem}>
        <CitySelector stateId={state} onChange={handleCityChange} />
      </div>
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        style={styles.formItem}
      />
      <Button variant='contained' color='primary' onClick={handleCreatePost}>
        Create Post
      </Button>
    </div>
  );
};

export default CreatePostForm;
