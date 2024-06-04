import './CharactersGrid.css';

interface Character {
  id: string;
  title: string;
  image: string;
}

// interface for the props that the CharactersGrid component will receive
interface CharactersGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void; // Prop to handle character click
}

// CharactersGrid component receives the characters and onCharacterClick props
const CharactersGrid = ({
  characters,
  onCharacterClick,
}: CharactersGridProps) => {
  return (
    <div className='grid-container'>
      {characters.map((character) => (
        <div
          key={character.id}
          className='grid-item'
          onClick={() => onCharacterClick(character)}
        >
          <img src={character.image} alt={character.title} />
          <p>{character.title}</p>
          <button onClick={() => onCharacterClick(character)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default CharactersGrid;
