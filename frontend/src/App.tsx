import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeroesList from "./pages/Heroes/HeroesList";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<HeroesList />} path="/" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
