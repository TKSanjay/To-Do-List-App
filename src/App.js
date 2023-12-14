import "./App.css";
import Sidemenu from "./Components/Sidemenu/Sidemenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Components/TaskList/TaskList";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/sidemenu' element={<Sidemenu />}>
            <Route path='home' element={<Home />} />
            <Route path='tasklist' element={<TaskList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
