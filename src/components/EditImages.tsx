import { useEffect, useState } from 'react';
import { getFileById } from '../api/postImages';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EditImage: React.FC<{ imageId: string; onImageDelete: () => void }> = ({
  imageId,
  onImageDelete,
}) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (imageId) {
        try {
          const file = await getFileById(imageId); // Fetch the image using the API function
          setImageURL(file);
        } catch (error) {
          console.error(error);
        }
      }
    };
    console.log({ imageId });
    fetchImage();
  }, []);
  const handleDeleteImage = () => {
    onImageDelete(imageId);
  };

  return (
    <Box display='flex' alignItems='center'>
      <Box
        width={300}
        height={300}
        marginRight={1}
        overflow='hidden'
        position='relative'
      >
        {imageURL && (
          <img
            src={imageURL}
            alt='Image'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <DeleteIcon
          onClick={handleDeleteImage}
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};
export default EditImage;
