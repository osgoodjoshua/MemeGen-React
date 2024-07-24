import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MemeCreator from './components/MemeCreator';
import AppNavbar from './components/Navbar';
import useMemeData from './custom_hooks/useMemeData';

const App: React.FC = () => {
  const { coreImages, createdMemes, setCreatedMemes} = useMemeData();

  const handleMemeCreated = (newMeme: { id: string; url: string; text: string }) => {
    setCreatedMemes((prevMemes) => [...prevMemes, newMeme]);
  };

  return (
    <div className="App">
      <AppNavbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard memes={createdMemes} />} />
          <Route path="/create-meme" element={<MemeCreator images={coreImages} onMemeCreated={handleMemeCreated} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
