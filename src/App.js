import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import Home from './components/home';
import Create from './components/Create';
import Edit from './components/Edit';
import ViewHouse from "./components/ViewHouse";
function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='/viewHouse/:id' element={<ViewHouse />}></Route>
      </Routes>
    </>
  );
}

export default App;
