import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Account from './Account';
import Jobs from './Jobs';
import Companies from './Companies';
import Company from './Company';
import LogOut from './LogOut';
import JoblyApi from './api';
import UserContext from './UserContext';

function App() {
	const [ user, setUser ] = useState({ username: null });
	const [ token, setToken ] = useState(null);
	useEffect(
		() => {
			let stored_token = window.localStorage.getItem('token');
			let stored_username = window.localStorage.getItem('username');
			if (stored_token === null && token) {
				window.localStorage.setItem('token', token);
				stored_token = window.localStorage.getItem('token');
			}
			if (stored_username === null && user.username) {
				window.localStorage.setItem('username', user.username);
				stored_username = window.localStorage.getItem('username');
			}
			if (stored_token !== null && stored_username !== null) {
				JoblyApi.token = stored_token;
				JoblyApi.getUser(stored_username).then((res) => {
					setUser(res);
				});
			}
		},
		[ token, user.username ]
	);
	const login = (data) => {
		JoblyApi.handleLogin(data).then((token) => {
			setUser(data);
			setToken(token);
		});
	};
	const signup = (data) => {
		JoblyApi.signup(data).then((token) => {
			setUser({ ...data, is_admin: true });
			setToken(token);
		});
	};
	const logout = (data) => {
		setUser({ username: null });
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('username');
		setToken(null);
	};
	const updateProfile = async (data) => {
		let resp;
		await JoblyApi.handleLogin({ username: data.username, password: data.password })
			.then(() => {
				delete data.password;
				delete data.username;
				JoblyApi.editProfile(user.username, data).catch(() => {
					resp = false;
				});
				setUser({ ...data, username: user.username });
				console.log(user);
				resp = true;
			})
			.catch(() => {
				resp = false;
			});
		return resp;
	};

	return user.username ? (
		<UserContext.Provider value={user}>
			<div className="App">
				<BrowserRouter>
					<Navbar />
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/signup">
						<SignUp signup={signup} token={token} />
					</Route>
					<Route exact path="/logout">
						<LogOut logout={logout} />
					</Route>
					<Route exact path="/login">
						<LogIn login={login} token={token} />
					</Route>
					<Route exact path="/account">
						<Account updateProfile={updateProfile} />
					</Route>
					<Route exact path="/jobs">
						<Jobs />
					</Route>
					<Route exact path="/companies">
						<Companies />
					</Route>
					<Route exact path="/companies/:handle">
						<Company />
					</Route>
				</BrowserRouter>
			</div>
		</UserContext.Provider>
	): <></>;
}

export default App;
