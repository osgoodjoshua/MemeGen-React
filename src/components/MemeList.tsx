
interface Meme {
  id: string;
  url: string;
  text?: string;
}

interface MemeListProps {
  memes: Meme[];
  onEdit: (meme: Meme) => void;
  onDelete: (memeId: string) => void;
}

const baseURL = 'https://memegen-fw7l.onrender.com';

const MemeList: React.FC<MemeListProps> = ({ memes, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      <h2>Memes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <div key={meme.id} className="border p-4">
            <img src={`${baseURL}${meme.url}`} alt="meme" className="w-full h-auto" />
            <p className="mt-2">{meme.text || 'No caption available'}</p>
            <button onClick={() => onEdit(meme)} className="bg-yellow-500 text-white p-2 rounded mt-2">
              Update
            </button>
            <button onClick={() => onDelete(meme.id)} className="bg-red-500 text-white p-2 ml-2 rounded mt-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeList;
