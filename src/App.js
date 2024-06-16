import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from './compoments/home';
import Create from './compoments/Create';
import Edit from './compoments/Edit';
import Detail from './compoments/detail';
import HostList from './compoments/host';
import Login from './compoments/Login';
import History from './compoments/History';
import Confirm from './compoments/confirm';

function App() {
    return (
        <>
        <BrowserRouter>
        <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/create' element={<Create />}></Route>
                <Route path='/edit/:id' element={<Edit />}></Route>
                <Route path='/detail/:id' element={<Detail />}></Route>
                <Route path='/host' element={< HostList />}></Route>
                <Route path='/' element={< Login />}></Route>
                <Route path='/history/:id' element={<History />}></Route>
                <Route path='/order/:id' element={<Confirm />}></Route>

            </Routes>
        </BrowserRouter>
            
        </>
    );
}
export default App;