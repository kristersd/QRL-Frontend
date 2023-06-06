import { useState } from "react";
import {Link} from "react-router-dom";
import LoginService from "../../services/api/auth/LoginService";

const Login = () => {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const [errorMessages, setErrorMessages] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault()

        setUsername('');
        setPassword('');

        console.log(username, password);

        LoginService.LoginUser(
            {
                username: username,
                password: password,
            })
            .then(response => {

                console.log(response);

            })
            .catch(response => {

                setErrorMessages(response.response.data);

            })

    }

    return (
        <>
            <div className={'register-page-container'}>

                <div className={'register-form-container'}>

                    <h1>Login</h1>

                    <div className="error-message-container">
                        { errorMessages.map(error => (
                            <p>
                                { error }
                            </p>
                        )) }
                    </div>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder={'Username'}
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <input
                            type="password"
                            placeholder={'Password'}
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <button disabled={!username || !password }>Login</button>

                    </form>

                    <p className={'sign-in-link'}>
                        No account? <Link to={'/register'}>Register</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;