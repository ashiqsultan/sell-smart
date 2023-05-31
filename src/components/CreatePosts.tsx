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

  return (
    <div style={styles.formContainer}>
      <Typography variant='h6' style={styles.formItem}>
        Create a New Post
      </Typography>
      <FormControl fullWidth style={styles.formItem}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value='category1'>Category 1</MenuItem>
          <MenuItem value='category2'>Category 2</MenuItem>
          <MenuItem value='category3'>Category 3</MenuItem>
        </Select>
      </FormControl>
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
      <FormControl fullWidth style={styles.formItem}>
        <InputLabel>State</InputLabel>
        <Select value={state} onChange={(e) => setState(e.target.value)}>
          <MenuItem value='state1'>State 1</MenuItem>
          <MenuItem value='state2'>State 2</MenuItem>
          <MenuItem value='state3'>State 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={styles.formItem}>
        <InputLabel>City</InputLabel>
        <Select value={city} onChange={(e) => setCity(e.target.value)}>
          <MenuItem value='city1'>City 1</MenuItem>
          <MenuItem value='city2'>City 2</MenuItem>
          <MenuItem value='city3'>City 3</MenuItem>
        </Select>
      </FormControl>
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
