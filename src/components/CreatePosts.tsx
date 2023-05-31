import { CSSProperties, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const validateFields = (): boolean => {
    // Check for empty strings or NaN number values
    if (
      !category ||
      !title ||
      isNaN(parseInt(price)) ||
      !state ||
      !city ||
      !description
    ) {
      console.error('Fields are not valid');
      return false;
    }
    return true;
  };

  const resetForm = (): void => {
    // Reset the states to their initial values
    setCategory('');
    setTitle('');
    setPrice('');
    setState('');
    setCity('');
    setDescription('');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCreatePost = async () => {
    const areFieldsValid = validateFields(); // Check if fields are valid
    if (areFieldsValid) {
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
        resetForm(); // Reset the form fields
        showSnackbar('Post created successfully', 'success');
      } catch (error) {
        console.error(error);
        // Handle error or show an error message
      }
    } else {
      showSnackbar('Please fill out all the fields before submitting', 'error');
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
      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Form title */}
      <Typography variant='h6' style={{ marginBlock: '10px' }}>
        Create a New Post
      </Typography>
      {/* Form items */}
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
