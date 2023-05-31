import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getByStateId, ICity } from '../../api/cities';

interface CitySelectorProps {
  stateId: string;
  onChange: (cityId: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ stateId, onChange }) => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await getByStateId(stateId);
        setCities(cityList);
      } catch (error) {
        console.error(error);
      }
    };

    if (stateId) {
      fetchCities();
    } else {
      setCities([]); // Reset cities if stateId is not provided
    }
  }, [stateId]);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const cityId = event.target.value as string;
    setSelectedCity(cityId);
    onChange(cityId); // Pass the selected city $id back to the parent component
  };

  return (
    <FormControl fullWidth>
      <InputLabel>City</InputLabel>
      <Select value={selectedCity} onChange={handleCityChange}>
        {cities.map((city) => (
          <MenuItem key={city.$id} value={city.$id}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
