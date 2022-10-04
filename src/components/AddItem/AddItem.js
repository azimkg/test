import React, { useContext, useState } from "react";
import { itemContext } from "../../context/itemContext";
import "./AddItem.css";

const AddItem = () => {
  const { handleAddItem } = useContext(itemContext);
  const [item, setItem] = useState({
    name: "",
    distance: "",
    query: "",
  });

  function handleValue(e) {
    let value = { ...item, [e.target.name]: e.target.value };
    setItem(value);
  }
  function newAddItem() {
    if (item.name === "" && item.distance === "") {
      return;
    }
    let newObj = {
      name: item.name,
      distance: item.distance,
      query: item.query,
    };
    handleAddItem(newObj);
    setItem({
      name: "",
      distance: "",
      query: "",
    });
  }
  console.log(item);
  return (
    <div className="admin_page">
      <h2 className="admin_page-title">Добавить новый элемент</h2>
      <form className="admin_page-form">
        <input
          type="text"
          className="admin_page-input"
          name="name"
          value={item.name}
          onChange={handleValue}
          placeholder="Название"
        />
        <input
          type="text"
          className="admin_page-input"
          name="query"
          value={item.query}
          onChange={handleValue}
          placeholder="Количество"
        />
        <input
          type="number"
          className="admin_page-input"
          name="distance"
          value={item.distance}
          onChange={handleValue}
          placeholder="Расстояние"
        />

        <button onClick={newAddItem} className="admin_page-button">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddItem;
