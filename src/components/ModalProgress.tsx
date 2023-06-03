import { Modal, CircularProgress } from '@mui/material';

const ModalProgress: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Modal open={isOpen}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default ModalProgress;
