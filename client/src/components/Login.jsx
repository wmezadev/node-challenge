import React, { useState } from 'react';
import { requestNoJWT } from '../helpers';

const Login = ({ history }) => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    
    const { username, password } = inputs;

    const [state, setState] = useState({
        isLoading: false,
        error: '',
        successful: false
    });

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const closeNotfication = e => {
        e.preventDefault();
        setState({ ...state, error: '' });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setState({
            successful: false,
            error: '',
            isLoading: true
        });

        try {

            const response = await requestNoJWT.post('user/login', {
                username,
                password
            });
    
            const user = {
                username,
                token: response.data.result.token
            }

            setState({
                successful: true,
                isLoading: true,
                error: ''
            });
    
            localStorage.setItem('chatroom-jobsity-user', JSON.stringify(user));
            history.push('/');
        }
        catch {
            
            setState({
                successful: false,
                isLoading: false,
                error: 'Invalid credentials'
            })
        }
        
    }


    return (
        <>
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <h1 className="title has-text-centered">Welcome to chat app</h1>
                            <h2 className="subtitle has-text-centered">Login or signup</h2>
                            <form onSubmit={handleSubmit} method="POST" className="box">
                                {
                                    state.error &&
                                    <div className="notification is-danger is-light">
                                        <button className="delete" onClick={closeNotfication}></button>
                                        { state.error }
                                    </div>
                                }
                                <div className="field">
                                <label htmlFor="username" className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input type="username" name="username" id="username" placeholder="e.g. username" className="input" required onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                    </span>
                                </div>
                                </div>
                                <div className="field">
                                <label htmlFor="password" className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input type="password" name="password" id="password" placeholder="*******" className="input" required onChange={handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                                </div>
                                <div className="field">
                                    Register to chat
                                </div>
                                <div className="field">
                                <button type="submit" className={`button is-success is-fullwidth ${state.isLoading ? 'is-loading' : ''}`} disabled={state.isLoading}>
                                    Login
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Login;