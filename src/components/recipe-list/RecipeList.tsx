import React from 'react';
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

const RecipeList: React.FC<RecipeListProps> = ({
  characters,
  onCharacterClick,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const getPaginationItems = () => {
    const items = [];
    const maxPageItems = 5;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, currentPage - halfPageItems);
    let endPage = Math.min(totalPages, currentPage + halfPageItems);

    if (currentPage - halfPageItems <= 0) {
      endPage = Math.min(
        totalPages,
        endPage + (halfPageItems - currentPage + 1)
      );
    }

    if (currentPage + halfPageItems > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfPageItems - totalPages)
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
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
        characters={characters}
        onCharacterClick={onCharacterClick}
      />
      {totalPages > 1 && (
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {getPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      )}
    </div>
  );
};

export default RecipeList;
