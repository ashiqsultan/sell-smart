import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ICategory } from '../../api/categories';

const Category: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { categories, categoryId } = state;

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const categoryId = event.target.value as string;
    dispatch({ type: 'SET_CATEGORY_ID', payload: categoryId });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={categoryId} onChange={handleCategoryChange}>
        {categories.map((category: ICategory) => (
          <MenuItem key={category.$id} value={category.$id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
