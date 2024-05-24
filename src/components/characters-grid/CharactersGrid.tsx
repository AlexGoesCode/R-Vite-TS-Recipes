import './CharactersGrid.css';

interface Character {
  id: number;
  title: string;
  image: string;
}

interface CharactersGridProps {
  characters: Character[];
}

const CharactersGrid = ({ characters }: CharactersGridProps) => {
  return (
    <div className='grid-container'>
      {characters.map((character) => (
        <div key={character.id} className='grid-item'>
          <img src={character.image} alt={character.title} />
          <p>{character.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CharactersGrid;