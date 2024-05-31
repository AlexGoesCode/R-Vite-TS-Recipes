interface SearchBarProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDiet: string;
  handleDietChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchClick: () => void;
}

function SearchBar(props: SearchBarProps) {
  return (
    <div className='search-bar'>
      <select
        className='filterSelect'
        value={props.selectedDiet}
        onChange={props.handleDietChange}
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
        value={props.inputValue}
        onChange={props.handleInputChange}
        placeholder='Search for recipes...'
      />
      <button className='searchButton' onClick={props.handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
