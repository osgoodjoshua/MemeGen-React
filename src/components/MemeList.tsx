import MemeItem from './MemeItem';

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

const MemeList: React.FC<MemeListProps> = ({ memes, onEdit, onDelete }) => (
  <div className="mt-4">
    <h2>Memes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memes.map((meme) => (
        <MemeItem key={meme.id} meme={meme} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  </div>
);

export default MemeList;
