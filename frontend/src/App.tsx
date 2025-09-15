import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeroesList from "./pages/Heroes/HeroesList";
import HeroesInfo from "./pages/HeroesInfo/HeroesInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeroesList />} path="/" />
        <Route element={<HeroesInfo />} path="/hero/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
