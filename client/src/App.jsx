import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Stories from "./components/stories/Stories";
import Character from "./components/character/Character";
import CharacterEdit from "./components/character-edit/CharacterEdit";

function App() {
  return (
    <>
      <Header />


      <Routes>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Stories />} />
        <Route path="/character" element={<Character />} />
        <Route path="/character/edit" element={<CharacterEdit />} />
        {/* <Route path="/create-story" element={<Story />} /> */}
      </Routes>
    </>
  );
}

export default App;
