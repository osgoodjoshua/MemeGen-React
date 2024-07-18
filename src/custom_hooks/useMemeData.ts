import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

interface Meme {
  id: string;
  url: string;
  text?: string;
}

const useMemeData = () => {
  const [allImages, setAllImages] = useState<Meme[]>([]);
  const [createdMemes, setCreatedMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await axiosInstance.get('/images'); // Endpoint to get all images
        const memesResponse = await axiosInstance.get('/captions'); // Endpoint to get created memes

        setAllImages(imagesResponse.data);
        setCreatedMemes(memesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allImages, createdMemes, loading, error };
};

export default useMemeData;
