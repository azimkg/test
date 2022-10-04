import React from "react";

const FilterByNum = ({ num, item, setNum }) => {
  return (
    // ! input с выпадающим окном для расстояния
    <div className="filter_by">
      <select
        selected
        className="filter_option select"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      >
        {item?.map((elem) => (
          <option key={elem.id} className="filter_option" value={elem.distance}>
            {elem.distance}
          </option>
        ))}
        <option className="filter_option" onclick={() => setNum("")}>
          Показать все
        </option>
      </select>
    </div>
  );
};

export default FilterByNum;
