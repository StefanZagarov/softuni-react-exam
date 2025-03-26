import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Stories from "./components/stories/Stories";
import Character from "./components/character/Character";
import CharacterEdit from "./components/character-edit/CharacterEdit";
import StoryCreate from "./components/story-create/StoryCreate";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import StoryDetails from "./components/story-details/StoryDetails";
import About from "./components/about/About";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Stories />} />
        <Route path="/character" element={<Character />} />
        <Route path="/character/edit" element={<CharacterEdit />} />
        <Route path="/create-story" element={<StoryCreate />} />
        <Route path="/story-details" element={<StoryDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
