import { useState, useContext, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { IPost, IPostDoc, getById, updatePost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';
import Category from './Selectors/Category';
import StateSelector from './Selectors/StateSelector';
import CitySelector from './Selectors/CitySelector';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { categoryId, stateId, cityId } = state;

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdatePost = async () => {
    try {
      const { title, price, description } = formData;
      const updateData = {
        category_id: categoryId,
        state_id: stateId,
        city_id: cityId,
        title,
        price,
        description,
      };
      await updatePost(postId, updateData);
      dispatch({ type: 'SET_CATEGORY_ID', payload: '' });
      dispatch({ type: 'SET_STATE_ID', payload: '' });
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData: IPostDoc = await getById(postId);
        setFormData({
          title: postData.title,
          price: postData.price,
          description: postData.description,
        });
        dispatch({ type: 'SET_CATEGORY_ID', payload: postData.category_id });
        dispatch({ type: 'SET_STATE_ID', payload: postData.state_id });
        setTimeout(() => {
          dispatch({ type: 'SET_CITY_ID', payload: postData.city_id });
        }, 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div>
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
      <Button variant='contained' color='primary' onClick={handleUpdatePost}>
        Update Post
      </Button>
    </div>
  );
};

export default EditPost;
