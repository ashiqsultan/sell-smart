import { getAll, ICategory } from '../../api/categories';
import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface CategoryProps {
  onChange: (categoryId: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onChange }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryList = await getAll();
        setCategories(categoryList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const categoryId = event.target.value as string;
    setSelectedCategory(categoryId);
    // Pass the selected category $id back to the parent component
    onChange(categoryId);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <MenuItem key={category.$id} value={category.$id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
