import React, { useState } from 'react';
import axiosInstance from '../api/axios';

interface UpdateMemeModalProps {
  meme: { id: string; url: string; text: string };
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateMemeModal: React.FC<UpdateMemeModalProps> = ({ meme, onClose, onUpdate }) => {
  const [text, setText] = useState(meme.text);
  const baseURL = 'https://memegen-fw7l.onrender.com';

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/captions/${meme.id}`, { text });
      onUpdate();
    } catch (error) {
      console.error('Error updating meme:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-4 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Meme</h2>
        <div className="flex justify-center mb-4">
          <img src={`${baseURL}${meme.url}`} alt="meme" className="max-w-full h-auto" />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">
            Update
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMemeModal;
