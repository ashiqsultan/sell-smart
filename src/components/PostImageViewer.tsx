import { useState, useEffect } from 'react';
import { getFileById } from '../api/postImages';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';

interface IPostImageViewerProps {
  imageIds: string[];
}

const PostImageViewer: React.FC<IPostImageViewerProps> = ({ imageIds }) => {
  const [images, setImages] = useState<URL[]>([]);

  const getImageFile = async (fileId: string): Promise<URL> => {
    try {
      const file = await getFileById(fileId);
      return file;
    } catch (error) {
      console.error(error);
      return new URL('');
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (imageIds) {
          const promises = imageIds.map((imageId) => getImageFile(imageId));
          const imageFiles = await Promise.all(promises);
          setImages(imageFiles);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [imageIds]);

  return (
    <Box mt={2}>
      {/* @ts-ignore */}
      <Carousel>
        {images.map((item) => (
          <div key={item.href || ''}>
            <img
              src={item.href}
              alt='Post Image'
              style={{
                width: '80%',
                height: '20%',
                marginBottom: '10px',
              }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default PostImageViewer;
