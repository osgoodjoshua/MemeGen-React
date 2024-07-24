import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axios';

interface Meme {
  id: string;
  url: string;
  text: string;
}

interface UpdateMemeModalProps {
  meme: Meme;
  onClose: () => void;
  onUpdate: (updatedMeme: Meme) => void;
}

const UpdateMemeModal: React.FC<UpdateMemeModalProps> = ({ meme, onClose, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: meme.text,
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.put(`/captions/${meme.id}`, {
        text: data.text,
      });

      const updatedMeme = {
        id: meme.id,
        url: meme.url,
        text: data.text,
      };

      onUpdate(updatedMeme);
      reset();
      onClose();
    } catch (error) {
      console.error('Error updating meme:', error);
      setError('Failed to update meme');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Meme</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <img src={meme.url} alt="meme" className="w-full h-auto mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter meme text</label>
              <input type="text" {...register('text', { required: true })} className="border p-2 w-full" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMemeModal;
