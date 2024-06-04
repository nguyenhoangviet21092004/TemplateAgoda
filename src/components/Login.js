import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { date } from "yup";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const value = {
        data: {
            username: username,
            password: password
        }
    };
    async function Login(e) {
        e.preventDefault();
        const reponse = await axios.post('http://localhost:8080/api/account/login', {
            username: username,
            password: password
        })

        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('account_id',reponse.data.id);
        sessionStorage.setItem('role', reponse.data.role);


        if (reponse.data.role === 'user') {
            navigate('/home')
        }else {
            navigate('/host')
        }

    }

    return (<>
        <MDBContainer fluid className="p-2 my-2">
            <h2 style={{textAlign:"center", marginTop:"4rem "}}>Login</h2>  

            <MDBRow>

                <MDBCol col='10' md='4'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                </MDBCol>

                <MDBCol col='4' md='5'>

                    <form onSubmit={Login}>
                    <MDBInput wrapperClass='mb-4' label='User Name' id='formControlLg' onChange={(e) => setUsername(e.target.value)} type='text' size="lg"/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' onChange={(e) => setPassword(e.target.value)} type='password' size="lg"/>


                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">OR</p>
                    </div>

                    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Continue with facebook
                    </MDBBtn>

                    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
                        <MDBIcon fab icon="twitter" className="mx-2"/>
                        Continue with twitter
                    </MDBBtn>
                    </form>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
       
    </>)
}

export default Login;