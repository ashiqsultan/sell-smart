import { useState, useEffect } from 'react';
import { getFileById } from '../api/postImages';

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
    <>
      {images.map((item) => (
        <img
          key={item.href || ''}
          src={item.href}
          alt='Post Image'
          style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
        />
      ))}
    </>
  );
};
export default PostImageViewer;
