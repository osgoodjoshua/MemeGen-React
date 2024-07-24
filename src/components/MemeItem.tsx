import React, { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';

interface MemeItemProps {
  meme: {
    id: string;
    url: string;
    text?: string;
  };
  onEdit: (meme: any) => void;
  onDelete: (memeId: string) => void;
}

const MemeItem: React.FC<MemeItemProps> = ({ meme, onEdit, onDelete }) => {
  const memeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (memeRef.current) {
      const dataUrl = await toJpeg(memeRef.current);
      download(dataUrl, 'meme.jpg', 'image/jpeg');
    }
  };

  return (
    <div className="relative border p-4">
      <div ref={memeRef} className="relative">
        <img src={meme.url} alt="meme" className="w-full h-auto" />
        {meme.text && (
          <div className="w-full bg-black text-white text-center p-4">
            <p className="text-2xl antialiased font-bold">{meme.text}</p>
          </div>
        )}
      </div>
      <div className="flex mt-2">
        <button onClick={() => onEdit(meme)} className="bg-yellow-500 text-white p-2 rounded">
          Update
        </button>
        <button onClick={() => onDelete(meme.id)} className="bg-red-500 text-white ml-3 p-2 rounded">
          Delete
        </button>
        <button onClick={handleDownload} className="bg-green-500 text-white ml-3 p-2 rounded">
          Download
        </button>
      </div>
    </div>
  );
};

export default MemeItem;
