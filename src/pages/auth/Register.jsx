import {useState, useEffect} from "react";
import RegisterService from "../../services/api/auth/RegisterService";
import {Link} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const Register = () => {

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessages([]);
    }, [username, password, matchPassword, name, email]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const usernameTest = USER_REGEX.test(username);
        const passwordTest = PWD_REGEX.test(password);

        if (!usernameTest || !passwordTest) {
            setErrorMessages(["Invalid Entry"]);
            return;
        }

        RegisterService.RegisterUser(
            {
                name: name,
                username: username,
                email: email,
                password: password,
            })
            .then(() => {

                setSuccess(true);

            })
            .catch(response => {

                setErrorMessages(response.response.data);

            });
    }

    return (
		<>
            <div className={'register-page-container'}>
                {success ? (
                    <div className={'success-message-container'}>
                        <h1>Success!</h1>
                        <p>
                            <Link to={'/login'}>Sign in</Link>
                        </p>
                    </div>
                ) : (
                    <div className={'register-form-container'}>

                        <h1>Register</h1>

                        <div className="error-message-container">
                            { errorMessages.map(error => (
                                <p>
                                    {error}
                                </p>
                            )) }
                        </div>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                placeholder={'Name'}
                                id="name"
                                autoFocus={true}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                className={name && validName ? "valid" : ""}
                            />

                            <div className={name && !validName ? "enabled input-info-container" : "disabled input-info-container"}>
                                <p>
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>

                            <input
                                type="text"
                                placeholder={'Username'}
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                className={username && validUsername ? "valid" : ""}
                            />

                            <div className={username && !validUsername ? "enabled input-info-container" : "disabled input-info-container"}>
                                <p>
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>

                            <input
                                type="text"
                                placeholder={'Email'}
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className={email && validEmail ? "valid" : ""}
                            />

                            <div className={email && !validEmail ? "enabled input-info-container" : "disabled input-info-container"}>
                                <p>
                                    Must follow email format<br />
                                    Example: vrl@gmail.com
                                </p>
                            </div>

                            <input
                                type="password"
                                placeholder={'Password'}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className={validPassword ? "valid" : ""}
                            />

                            <div className={password && !validPassword ? "enabled input-info-container" : "disabled input-info-container"}>
                                <p>
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: ! @ # $ %
                                </p>
                            </div>

                            <input
                                type="password"
                                placeholder={'Confirm password'}
                                id="confirm_pwd"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                required
                                className={validPassword && validMatch ? "valid" : ""}
                            />

                            <div className={!validMatch ? "enabled input-info-container" : "disabled input-info-container"}>
                                <p>
                                    Must match the first password input field.
                                </p>
                            </div>

                            <button disabled={!validUsername || !validPassword || !validMatch }>Sign Up</button>

                        </form>

                        <p className={'sign-in-link'}>
                            Already registered? <Link to={'/login'}>Sign in</Link>
                        </p>
                    </div>
                )}
            </div>
        </>
	)
}

export default Register;