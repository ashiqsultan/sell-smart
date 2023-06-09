import { useEffect, useState, useContext } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAll, IState } from '../../api/states';
import { AppContext } from '../../context/AppContext';

const StateSelector: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [states, setStates] = useState<IState[]>([]);

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

  const handleStateChange = (event: any) => {
    const stateId = event.target.value as string;
    dispatch({ type: 'SET_STATE_ID', payload: stateId });
  };

  return (
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select value={state.stateId} onChange={handleStateChange}>
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
