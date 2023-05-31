import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAll, IState } from '../../api/states';

interface StateSelectorProps {
  onChange: (stateId: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onChange }) => {
  const [states, setStates] = useState<IState[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stateList = await getAll();
        setStates(stateList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const stateId = event.target.value as string;
    setSelectedState(stateId);
    onChange(stateId); // Pass the selected state $id back to the parent component
  };

  return (
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select value={selectedState} onChange={handleStateChange}>
        {states.map((state) => (
          <MenuItem key={state.$id} value={state.$id}>
            {state.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StateSelector;
