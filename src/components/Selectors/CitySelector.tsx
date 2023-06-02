import React, { useContext, useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getByStateId, ICity } from '../../api/cities';
import { AppContext } from '../../context/AppContext';

const CitySelector: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const cityId = event.target.value as string;
    dispatch({ type: 'SET_CITY_ID', payload: cityId });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>City</InputLabel>
      <Select value={state.cityId} onChange={handleCityChange}>
        {state.cities.map((city) => (
          <MenuItem key={city.$id} value={city.$id}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
