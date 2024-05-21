import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { date } from "yup";

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const value = {
        data: {
            userName: userName,
            password: password
        }
    };
    async function Login(e) {

        e.preventDefault();
        const reponse = await axios.post('http://localhost:8080/api/account/login', {
            userName: userName,
            password: password
        })
        
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('roles', reponse.data.roles);




        if (reponse.data) {
            navigate('/home')
        }

    }

    return (<>

       
        <form onSubmit={Login}>
            <div class="mb-3">
                <label for="userName" class="form-label">UserName</label>
                <input type="text" class="form-control" id="userName" onChange={(e) => setUserName(e.target.value)}></input>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="text" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <button type="submit" className="btn btn-outline-primary">Login</button>
        </form>


    </>)
}

export default Login;