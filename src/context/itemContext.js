import React, { useReducer } from "react";
import axios from "axios";
import { API, GET_ALL_ITEM } from "../helpers/APIconfig";

export const itemContext = React.createContext();

// ! Переменная для храниения данных из БД
const INITIAL_STATE = {
  item: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

const ItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // ! Асинхронное получение всех элементов из БД
  async function getAllItem() {
    let { data } = await axios.get(API + "/item" + window.location.search);
    console.log(data);
    dispatch({
      type: GET_ALL_ITEM,
      payload: data,
    });
  }
  // ! Асинхронная функция, для добавления данных в БД
  async function handleAddItem(newItem) {
    try {
      let res = await axios.post(API + "/item", newItem, {
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(res);
      getAllItem();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <itemContext.Provider
      // ! Доступ к функциям, из дерева уомпонентов
      value={{ item: state.item, getAllItem, handleAddItem }}
    >
      {children}
    </itemContext.Provider>
  );
};
export default ItemContextProvider;
