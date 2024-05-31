import React from 'react';

interface SearchBarProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDiet: string;
  handleDietChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  handleInputChange,
  selectedDiet,
  handleDietChange,
  handleSearchClick,
}) => {
  return (
    <div className='search-bar'>
      <select
        className='filterSelect'
        value={selectedDiet}
        onChange={handleDietChange}
      >
        <option value=''>All Diets</option>
        <option value='gluten free'>Gluten Free</option>
        <option value='ketogenic'>Ketogenic</option>
        <option value='vegetarian'>Vegetarian</option>
        <option value='vegan'>Vegan</option>
        <option value='pescatarian'>Pescatarian</option>
        <option value='paleo'>Paleo</option>
        <option value='primal'>Primal</option>
        <option value='whole30'>Whole30</option>
      </select>
      <input
        className='searchInput'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Search for recipes...'
      />
      <button className='searchButton' onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
