import { Provider } from "react-redux";
import "./App.module.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Wallpaper } from "./components/Wallpaper/Wallpaper";
import { Weather } from "./components/Weather/Weather";
import { Container } from "react-bootstrap";
import { store } from "./app/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Wallpaper></Wallpaper>
        <Container>
          <SearchBar></SearchBar>
          <Weather />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
