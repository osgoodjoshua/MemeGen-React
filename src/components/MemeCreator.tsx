import React, { useState, useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axiosInstance from '../api/axios';
import { FlashMessageContext } from '../context/FlashMessageContext';

interface MemeCreatorProps {
  images: { id: string; url: string }[];
}

interface FormData {
  text: string;
}

const MemeCreator: React.FC<MemeCreatorProps> = ({ images }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [memeUrl, setMemeUrl] = useState('');
  const flashMessageContext = useContext(FlashMessageContext);

  useEffect(() => {
    if (flashMessageContext && flashMessageContext.message) {
      const timer = setTimeout(() => flashMessageContext.setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessageContext]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (flashMessageContext) {
      const { setMessage } = flashMessageContext;
      try {
        const response = await axiosInstance.post('/captions', {
          image_id: selectedImage,
          text: data.text,
        });
        setMemeUrl(response.data.image_url);
        setMessage('Meme Created!');
        reset();
        setSelectedImage(null);
      } catch (error) {
        console.error('Error creating meme:', error);
      }
    }
  };

  return (
    <div>
      {flashMessageContext && flashMessageContext.message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded">
          {flashMessageContext.message}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Create a Meme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={`https://memegen-fw7l.onrender.com${image.url}`}
              alt="meme"
              onClick={() => setSelectedImage(image.id)}
              className={`cursor-pointer border-2 ${
                selectedImage === image.id ? 'border-blue-500' : 'border-transparent'
              }`}
            />
            {selectedImage === image.id && (
              <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <input
          {...register('text')}
          placeholder="Enter meme text"
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Meme
        </button>
      </form>
      {memeUrl && <img src={memeUrl} alt="Your meme" className="mt-4" />}
    </div>
  );
};

export default MemeCreator;
