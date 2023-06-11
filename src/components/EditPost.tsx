import { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import { IPostDoc, getById, updatePost, deletePost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import Category from './Selectors/Category';
import StateSelector from './Selectors/StateSelector';
import CitySelector from './Selectors/CitySelector';
import DeleteIcon from '@mui/icons-material/Delete';
import EditImages from './EditImages';
import FileUpload from './FileUpload';
import { deleteFile, uploadFilesPromise } from '../api/postImages';
import ModalProgress from './ModalProgress';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { categoryId, stateId, cityId } = state;
  const [imageIds, setImageIds] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdatePost = async () => {
    try {
      setIsLoading(true);
      const { title, price, description } = formData;
      const updateData: any = {
        category_id: categoryId,
        state_id: stateId,
        title,
        price,
        description,
      };
      if (state.cityId) {
        updateData.city_id = cityId;
      }
      let uploadedFileIds: string[] = [];
      if (uploadedFiles.length > 0) {
        uploadedFileIds = await uploadFilesPromise(uploadedFiles);
        updateData.image_ids = [...imageIds, ...uploadedFileIds];
      }

      await updatePost(postId, updateData);
      dispatch({ type: 'SET_CATEGORY_ID', payload: '' });
      dispatch({ type: 'SET_STATE_ID', payload: '' });
      setUploadedFiles([]);
      setIsLoading(false);
      navigate(`/post/${postId}`);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const fetchPostData = async () => {
    try {
      setIsLoading(true);
      const postData: IPostDoc = await getById(postId);
      setFormData({
        title: postData.title,
        price: postData.price,
        description: postData.description,
      });
      setImageIds(postData.image_ids);
      dispatch({ type: 'SET_CATEGORY_ID', payload: postData.category_id });
      dispatch({ type: 'SET_STATE_ID', payload: postData.state_id });
      setTimeout(() => {
        dispatch({ type: 'SET_CITY_ID', payload: postData.city_id });
      }, 0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    console.log('Delete post:', postId);
    await deletePost(postId);
    navigate('/');
  };

  const onImageDelete = async (removedImageId: string) => {
    const newImageIds = imageIds.filter((i) => i !== removedImageId);
    setImageIds(newImageIds);
    await deleteFile(removedImageId);
    await updatePost(postId, { image_ids: newImageIds });
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  //  Cleanup
  useEffect(() => {
    return () => {
      dispatch({ type: 'CLEAR_FILTERS' });
    };
  }, []);

  return (
    <>
      <ModalProgress isOpen={isLoading} />
      <Card>
        <CardContent>
          <Box display={'flex'} flexDirection={'column'} rowGap={'2rem'}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h5'>Edit Post</Typography>
              <Button
                variant='contained'
                color='error'
                endIcon={<DeleteIcon />}
                onClick={handleDeletePost}
              >
                Delete Post
              </Button>
            </Grid>
            <Category />
            <TextField
              label='Title'
              fullWidth
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              label='Price'
              fullWidth
              name='price'
              value={formData.price}
              onChange={handleInputChange}
              type='number'
            />
            <TextField
              label='Description'
              fullWidth
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            <StateSelector />
            <CitySelector />
            <Box>
              <FileUpload onFilesChange={setUploadedFiles} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleUpdatePost}
              >
                Update Post
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box>
        <ul
          style={{
            marginTop: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            columnGap: 2,
          }}
        >
          {Array.isArray(imageIds) &&
            imageIds.length > 0 &&
            imageIds.map((imageId) => (
              <li key={imageId}>
                <EditImages imageId={imageId} onImageDelete={onImageDelete} />
              </li>
            ))}
        </ul>
      </Box>
    </>
  );
};

export default EditPost;
