import "./App.css";
import ItemContextProvider from "./context/itemContext";
import Routing from "./Routing";

function App() {
  return (
    <ItemContextProvider>
      <Routing />
    </ItemContextProvider>
  );
}

export default App;
