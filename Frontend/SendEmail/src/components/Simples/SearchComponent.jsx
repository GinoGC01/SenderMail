import Search from "../Icons/Search";
import PropTypes from "prop-types";

export default function SearchComponent({ handleChange, sectionStudio }) {
  return (
    <div className="search-component">
      <div className="search-component_input">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          placeholder={`filtrar en ${sectionStudio}`}
        />
        <label htmlFor="search">
          <Search />
        </label>
      </div>
    </div>
  );
}

SearchComponent.propTypes = {
  handleChange: PropTypes.func,
  sectionStudio: PropTypes.string,
};
