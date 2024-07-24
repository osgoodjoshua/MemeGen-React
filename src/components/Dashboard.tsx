import React, { useState, useContext, useEffect } from 'react';
import MemeList from './MemeList';
import UpdateMemeModal from './UpdateMemeModal';
import axiosInstance from '../api/axios';
import { FlashMessageContext } from '../context/FlashMessageContext';

interface Meme {
  id: string;
  url: string;
  text?: string;
}

interface DashboardProps {
  memes: Meme[];
}

const Dashboard: React.FC<DashboardProps> = ({ memes: initialMemes }) => {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const flashMessageContext = useContext(FlashMessageContext);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axiosInstance.get('/captions');
        setMemes(response.data);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchMemes();
  }, []);

  useEffect(() => {
    if (flashMessageContext && flashMessageContext.message) {
      const timer = setTimeout(() => flashMessageContext.setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessageContext]);

  const handleEdit = (meme: Meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleDelete = async (memeId: string) => {
    if (flashMessageContext) {
      const { setMessage } = flashMessageContext;
      try {
        await axiosInstance.delete(`/captions/${memeId}`);
        setMemes(memes.filter((meme) => meme.id !== memeId));
        setMessage('Your meme was deleted');
      } catch (error) {
        console.error('Error deleting meme:', error);
      }
    }
  };

  const handleUpdate = async (updatedMeme: Meme) => {
    if (flashMessageContext) {
      const { setMessage } = flashMessageContext;
      try {
        setMemes(memes.map((meme) => (meme.id === updatedMeme.id ? updatedMeme : meme)));
        setMessage('Your meme was updated');
      } catch (error) {
        console.error('Error updating meme:', error);
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
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <MemeList memes={memes} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && selectedMeme && (
        <UpdateMemeModal
          meme={{ ...selectedMeme, text: selectedMeme.text || '' }}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
