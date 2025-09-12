import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeroesList from "./pages/Heroes/HeroesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeroesList />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
