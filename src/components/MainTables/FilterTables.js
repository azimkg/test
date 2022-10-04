import React from "react";

const FilterTables = ({ item, title, setTitle }) => {
  return (
    // ! input с выпадающим окном для названий
    <div className="filter_by">
      <select
        selected
        className="filter_option select"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        {item?.map((elem) => (
          <option key={elem.id} className="filter_option" value={elem.name}>
            {elem.name}
          </option>
        ))}
        <option className="filter_option" onclick={() => setTitle("")}>
          Показать все
        </option>
      </select>
    </div>
  );
};

export default FilterTables;
