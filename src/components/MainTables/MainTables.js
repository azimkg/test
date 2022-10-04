import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { itemContext } from "../../context/itemContext";
import FilterByNum from "./FilterByNum";
import FilterTables from "./FilterTables";
import "./MainTables.css";
const MainTables = () => {
  //! Получение get функции и переменной, в котором хранится данные из БД, с помощью хука
  const { getAllItem, item } = useContext(itemContext);

  const [visible, setVisible] = useState(false);
  const [visiblility, setVisibility] = useState(false);
  const [modal, setModal] = useState(true);

  // ! Переменные для фильтрации
  const [title, setTitle] = useState("");
  const [num, setNum] = useState("");
  const [filtered, setFiltered] = useState(item);

  //! Функция getAllItem должна вызваться при рендере страницы

  useEffect(() => {
    getAllItem();
  }, []);

  useEffect(() => {
    setFiltered(item);
  }, [item]);

  //! Функция для фильтрации по названию
  function todoFilter(name) {
    if (name === title) {
      let newItem = [...item].filter((elem) => elem.name === title);
      setFiltered(newItem);
    } else {
      setFiltered(item);
    }
  }

  //! Функция для фильтрации по растоянию
  function itemFilter(number) {
    if (number === num) {
      let newItem = [...item].filter((elem) => elem.distance < num);
      setFiltered(newItem);
    }
  }

  function itemsFilter(number) {
    if (number === num) {
      let newItem = [...item].filter((elem) => elem.distance > num);
      setFiltered(newItem);
    }
  }

  // ! Функции для выбора колонок
  function saw() {
    setVisible(true);
    setModal(false);
  }
  function see() {
    setVisibility(true);
    setModal(false);
  }

  return (
    <div className="wrapper">
      <h2 className="wrapper_title">Рекорды по легкой атлетике</h2>

      {/* Фильтрация по названию */}
      {visible ? (
        <div className="filter_block">
          <FilterTables item={item} title={title} setTitle={setTitle} />
          <button
            className="wrapper_filter-btn"
            onClick={() => todoFilter("all")}
          >
            Все
          </button>
          <button
            className="wrapper_filter-btn"
            onClick={() => todoFilter(title)}
          >
            Выбранный
          </button>
          <span
            className="close"
            onClick={() => {
              setVisible(false);
              setModal(true);
            }}
          >
            x
          </span>
        </div>
      ) : null}

      {/* Фильтрация по расстоянию */}
      {visiblility ? (
        <div className="filter_block">
          <FilterByNum num={num} setNum={setNum} item={item} />
          <button
            className="wrapper_filter-btn"
            onClick={() => itemFilter(num)}
          >
            До
          </button>
          <button
            className="wrapper_filter-btn"
            onClick={() => itemsFilter(num)}
          >
            Больше
          </button>
          <span
            className="close"
            onClick={() => {
              setVisibility(false);
              setModal(true);
            }}
          >
            x
          </span>
        </div>
      ) : null}
      {modal ? (
        <div className="filter_block">
          <span className="visible_span" onClick={saw}>
            По названию
          </span>
          <span className="visible_span" onClick={see}>
            По расстоянию
          </span>
        </div>
      ) : null}

      {/* Таблица */}
      <table className="wrapper_table">
        <tr className="wrapper_table-tr">
          <th className="table_tr-td colors ">Дата</th>
          <th
            className="table_tr-td green"
            onClick={() =>
              (item = item.sort((a, b) => a.name.length < b.name.length))
            }
          >
            Название
          </th>
          <th className="table_tr-td orange ">Количество</th>
          <th className="table_tr-td blue">Расстояние</th>
        </tr>

        {/* Перебор и отображение элементов из базы данных */}
        {filtered?.map((elem) => (
          <tr key={elem.id} className="wrapper_table_tr_1">
            <td className="table_tr-td">
              {elem.createdAt.split("").slice(0, 10).join("")}
            </td>
            <td className="table_tr-td td_green">{elem.name}</td>
            <td className="table_tr-td td_orange">{elem.query}</td>
            <td className="table_tr-td td_blue">{elem.distance} м</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MainTables;
