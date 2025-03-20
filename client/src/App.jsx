import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Quests from "./components/quests/Quests";

function App() {
  return (
    <>
      <Header />


      <Routes>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Quests />} />
        <Route path="/character" element={<Quests />} />
        <Route path="/create-quest" element={<Quests />} />
      </Routes>
    </>
  );
}

export default App;
