import CharactersGrid from '../characters-grid/CharactersGrid';
import Pagination from 'react-bootstrap/Pagination';

type Character = {
  id: string;
  title: string;
  image: string;
};

// interface for the props that the RecipeList component will receive
interface RecipeListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

// RecipeList component receives the characters, onCharacterClick,
// totalPages, currentPage, and handlePageChange props
function RecipeList(props: RecipeListProps) {
  const getPaginationItems = () => {
    const items = [];
    const maxPageItems = 5;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, props.currentPage - halfPageItems);
    let endPage = Math.min(props.totalPages, props.currentPage + halfPageItems);

    // Adjust startPage and endPage, if too close to the start or end
    if (props.currentPage - halfPageItems <= 0) {
      endPage = Math.min(
        props.totalPages,
        endPage + (halfPageItems - props.currentPage + 1)
      );
    }

    if (props.currentPage + halfPageItems > props.totalPages) {
      startPage = Math.max(
        1,
        startPage - (props.currentPage + halfPageItems - props.totalPages)
      );
    }

    // create the pagination items
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === props.currentPage}
          onClick={() => props.handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  // RecipeList component returns the CharactersGrid component and Pagination
  return (
    // display CharactersGrid component and Pagination
    <div className='recipe-list'>
      <CharactersGrid
        characters={props.characters}
        onCharacterClick={props.onCharacterClick}
      />
      {props.totalPages > 1 && ( // display pagination only if there is more than one page
        <Pagination>
          <Pagination.First onClick={() => props.handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => props.handlePageChange(props.currentPage - 1)}
            disabled={props.currentPage === 1}
          />
          {getPaginationItems()}
          <Pagination.Next
            onClick={() => props.handlePageChange(props.currentPage + 1)}
            disabled={props.currentPage === props.totalPages}
          />
          <Pagination.Last
            onClick={() => props.handlePageChange(props.totalPages)}
          />
        </Pagination>
      )}
    </div>
  );
}

export default RecipeList;
