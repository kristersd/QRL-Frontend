import {useState, useEffect} from "react";
import RegisterService from "../../services/api/auth/RegisterService";

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

    const [errorMessages, setErrorMessages] = useState(["Invalid username", "Invalid password"]);
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
            <div className={'w-full min-h-screen flex justify-center items-center flex-wrap bg-blue-gradient '}>

                { success ? (

                    <div className={'w-[475px] rounded bg-blue-normal'}>
                        <h1>Successfully Registered</h1>
                    </div>

                ) : (

                    <div className={'w-[475px] flex flex-wrap bg-blue-light rounded p-5 shadow-xl'}>

                        <h1 className={'block w-full h-[50px] text-4xl text-off-white font-bold text-center'}>Register</h1>

                        <div className={'block w-full text-2xl'}>
                            { errorMessages.map(error => (
                                <p>
                                    {error}
                                </p>
                            )) }
                        </div>

                        <form onSubmit={ handleSubmit }>

                            <input
                                type="text"
                                placeholder={'Name'}
                                id="name"
                                autoFocus={true}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                className={name && validName ?
                                    "w-full bg-blue-light text-off-white p-1 mt-5 border-b-2 border-b-off-white focus:outline-none" :
                                    "w-full bg-blue-light text-off-white p-1 mt-5 border-b-2 border-lime-700 focus:outline-none"
                                }
                            />

                            <div className={"overflow-hidden"}>
                                <p className={name && !validName ?
                                    "box-content border-off-white border-2 mt-2 p-2 transition-max-height text-off-white duration-700 max-h-[400px] delay-300" :
                                    "box-content border-off-white border-2 mt-2 p-2 transition-max-height text-off-white duration-700 max-h-0 h-0"
                                }>
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
                                className={username && validUsername ?
                                    "w-full bg-blue-normal" :
                                    "w-full bg-blue-normal"
                                }
                            />

                            <div className={"overflow-hidden"}>
                                <p className={username && !validUsername ? "transition-max-height duration-700 max-h-[400px] delay-300" : "transition-max-height duration-700 max-h-0"}>
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
                                className={email && validEmail ?
                                    "w-full " :
                                    "w-full "
                                }
                            />

                            <div className={"overflow-hidden"}>
                                <p className={email && !validEmail ? "transition-max-height duration-700 max-h-[400px] delay-300" : "transition-max-height duration-700 max-h-0"}>
                                    Must follow email format<br />
                                    Example: qrl@gmail.com
                                </p>
                            </div>

                            <input
                                type="password"
                                placeholder={'Password'}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className={validPassword ?
                                    "w-full " :
                                    "w-full "
                                }
                            />

                            <div className={"overflow-hidden"}>
                                <p className={password && !validPassword ? "transition-max-height duration-700 max-h-[400px] delay-300" : "transition-max-height duration-700 max-h-0"}>
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
                                className={validPassword && validMatch ?
                                    "w-full " :
                                    "w-full "
                                }
                            />

                            <div className={"overflow-hidden"}>
                                <p  className={matchPassword && !validMatch ? "transition-max-height duration-700 max-h-[400px] delay-300" : "transition-max-height duration-700 max-h-0"}>
                                    Must match the first password input field.
                                </p>
                            </div>

                            <button disabled={!validUsername || !validPassword || !validMatch }>Sign Up</button>

                        </form>
                    </div>
                )}
            </div>

        </>
	)
}

export default Register;