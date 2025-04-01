import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Stories from "./components/stories/Stories";
import Character from "./components/character/Character";
import StoryCreate from "./components/story-create/StoryCreate";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import StoryDetails from "./components/story-details/StoryDetails";
import About from "./components/about/About";
import UserProvider from "./components/providers/UserProvider";
import StoryEdit from "./components/story-edit/StoryEdit";
import GuestGuard from "./guards/GuestGuard";
import UserGuard from "./guards/UserGuard";
import PageNotFound from "./components/404/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <>
        <Toaster />
      </>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories/:storyId/details" element={<StoryDetails />} />

        <Route element={<GuestGuard />}>
          <Route path="/character" element={<Character />} />
          <Route path="/create-story" element={<StoryCreate />} />
          <Route path="/stories/:storyId/edit" element={<StoryEdit />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route element={<UserGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
