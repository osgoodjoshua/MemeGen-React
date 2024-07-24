import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axios';
import { FlashMessageContext } from '../context/FlashMessageContext';

interface Image {
  id: string;
  url: string;
}

interface MemeCreatorProps {
  images: Image[];
  onMemeCreated: (newMeme: { id: string; url: string; text: string }) => void;
}

const MemeCreator: React.FC<MemeCreatorProps> = ({ images, onMemeCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const flashMessageContext = useContext(FlashMessageContext);
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Images passed to MemeCreator:', images); // Debug log
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const onSubmit = async (data: any) => {
    if (selectedImage) {
      try {
        const response = await axiosInstance.post('/captions', {
          text: data.text,
          image_id: selectedImage.id,
        });

        const newMeme = {
          id: response.data.id,
          url: selectedImage.url,
          text: data.text,
        };

        onMemeCreated(newMeme);
        setLocalMessage('Meme Created!');
        flashMessageContext?.setMessage('Meme Created!');
        reset();
        setSelectedImage(null);

        setTimeout(() => {
          setLocalMessage(null);
          flashMessageContext?.setMessage('');
        }, 2000);
      } catch (error) {
        console.error('Error creating meme:', error);
        setLocalMessage('Failed to create meme');
        flashMessageContext?.setMessage('Failed to create meme');

        setTimeout(() => {
          setLocalMessage(null);
          flashMessageContext?.setMessage('');
        }, 2000);
      }
    }
  };

  const baseURL = 'https://memegen-fw7l.onrender.com'; // Base URL of your Flask app

  return (
    <div>
      {localMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded">
          {localMessage}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Create a Meme</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {images.map((image) => (
          <label key={image.id} className="cursor-pointer">
            <input
              type="radio"
              name="image"
              value={image.id}
              onChange={() => setSelectedImage(image)}
              className="hidden"
            />
            <img
              src={`${baseURL}${image.url}`}
              alt="meme"
              className={`w-full h-auto ${selectedImage?.id === image.id ? 'border-4 border-purple-400' : ''}`}
            />
          </label>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter meme text</label>
          <input type="text" {...register('text', { required: true })} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded" disabled={!selectedImage}>
          Create Meme
        </button>
      </form>
    </div>
  );
};

export default MemeCreator;
