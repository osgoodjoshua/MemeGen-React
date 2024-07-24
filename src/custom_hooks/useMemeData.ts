import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

interface Image {
  id: string;
  url: string;
  is_core: boolean;
}

interface Meme {
  id: string;
  url: string;
  text?: string;
}

const useMemeData = () => {
  const [coreImages, setCoreImages] = useState<Image[]>([]);
  const [createdMemes, setCreatedMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await axiosInstance.get('/images');
        const memesResponse = await axiosInstance.get('/captions');

        const coreImagesData = imagesResponse.data.filter((image: Image) => image.is_core);
        console.log('Core Images:', coreImagesData); // Debug log
        console.log('Created Memes:', memesResponse.data); // Debug log

        setCoreImages(coreImagesData);
        setCreatedMemes(memesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { coreImages, createdMemes, setCreatedMemes, loading, error };
};

export default useMemeData;
