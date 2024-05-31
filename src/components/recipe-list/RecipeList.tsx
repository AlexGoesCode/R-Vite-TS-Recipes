import CharactersGrid from '../../components/characters-grid/CharactersGrid';
import Pagination from 'react-bootstrap/Pagination';

type Character = {
  id: string;
  title: string;
  image: string;
};

interface RecipeListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

function RecipeList(props: RecipeListProps) {
  const getPaginationItems = () => {
    const items = [];
    const maxPageItems = 5;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, props.currentPage - halfPageItems);
    let endPage = Math.min(props.totalPages, props.currentPage + halfPageItems);

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

  return (
    <div className='recipe-list'>
      <CharactersGrid
        characters={props.characters}
        onCharacterClick={props.onCharacterClick}
      />
      {props.totalPages > 1 && (
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
