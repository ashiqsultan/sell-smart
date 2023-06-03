import { useContext, ChangeEvent } from 'react';
import { AppContext } from '../context/AppContext';
import { TextField } from '@mui/material';

interface PriceTextFieldProps {
  isMinPrice: boolean;
}

const PriceMinMaxField: React.FC<PriceTextFieldProps> = ({ isMinPrice }) => {
  const { state, dispatch } = useContext(AppContext);
  const { minPrice, maxPrice } = state;

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= 0) {
      if (isMinPrice) {
        dispatch({ type: 'SET_MIN_PRICE', payload: newValue });
      } else {
        dispatch({ type: 'SET_MAX_PRICE', payload: newValue });
      }
    }
  };

  const value = isMinPrice ? minPrice : maxPrice;
  const label = isMinPrice ? 'Min Price' : 'Max Price';

  return (
    <TextField
      label={label}
      value={value}
      onChange={handlePriceChange}
      type='number'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default PriceMinMaxField;
