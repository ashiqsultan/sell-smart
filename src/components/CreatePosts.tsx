import { CSSProperties, useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import FileUpload from './FileUpload';

import { create } from '../api/posts';
import Category from './Selectors/Category';
import StateSelector from './Selectors/StateSelector';
import CitySelector from './Selectors/CitySelector';
import { upload } from '../api/postImages';
import { AppContext } from '../context/AppContext';
import ModalProgress from './ModalProgress';
import { useNavigate } from 'react-router-dom';

const styles: Record<string, CSSProperties> = {
  formContainer: { marginTop: '1rem', padding: '0 1rem' },
  formItem: { marginBottom: '1rem' },
};
const CreatePostForm = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { categoryId, stateId, cityId } = state;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = (): boolean => {
    // Check for empty strings or NaN number values
    if (
      !categoryId ||
      !title ||
      isNaN(parseInt(price)) ||
      !stateId ||
      !cityId ||
      !description
    ) {
      console.error('Fields are not valid');
      return false;
    }
    return true;
  };

  const resetForm = (): void => {
    // Reset the states to their initial values
    setTitle('');
    setPrice('');
    setDescription('');
    setUploadedFiles([]);
    dispatch({ type: 'SET_CATEGORY_ID', payload: '' });
    dispatch({ type: 'SET_STATE_ID', payload: '' });
    dispatch({ type: 'SET_CITY_ID', payload: '' });
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const uploadFiles = async (files: File[]) => {
    try {
      const promises: Array<Promise<string>> = files.map((file) =>
        upload(file)
      );
      const uploadedFileIds = await Promise.all(promises);
      return uploadedFileIds;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCreatePost = async () => {
    if (uploadedFiles.length <= 0) {
      showSnackbar('Please upload at least one Image', 'error');
    }
    const areFieldsValid = validateFields(); // Check if fields are valid
    if (areFieldsValid) {
      try {
        setIsLoading(true);
        let uploadedFileIds: string[] = [];
        if (uploadedFiles.length > 0) {
          uploadedFileIds = await uploadFiles(uploadedFiles);
        }
        const result = await create(
          categoryId,
          title,
          parseInt(price),
          stateId,
          cityId,
          description,
          uploadedFileIds
        );
        console.log(result);
        resetForm(); // Reset the form fields
        showSnackbar('Post created successfully', 'success');
        setIsLoading(false);
        navigate(`/post/${result.$id}`);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        // Handle error or show an error message
      }
    } else {
      showSnackbar('Please fill out all the fields before submitting', 'error');
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_CATEGORY_ID', payload: '' });
    dispatch({ type: 'SET_STATE_ID', payload: '' });
    dispatch({ type: 'SET_CITY_ID', payload: '' });
  }, []);

  return (
    <>
      <ModalProgress isOpen={isLoading} />
      <div style={styles.formContainer}>
        {/* Snackbar component */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
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
          <Category />
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
          <StateSelector />
        </div>
        <div style={styles.formItem}>
          <CitySelector stateId={state} />
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
        <div style={styles.formItem}>
          <FileUpload onFilesChange={setUploadedFiles} />
        </div>
        <Button variant='contained' color='primary' onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>
    </>
  );
};

export default CreatePostForm;
