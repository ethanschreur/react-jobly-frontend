import { Button } from '@material-ui/core';
import './Home.css';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import {useContext} from 'react';

function Home() {
	const user = useContext(UserContext);
	return (
		<div className="Home">
			<h1>Jobly</h1>
			<span>All the jobs in one, convenient place.</span>
            <br/>
            <br/>
			{
			user.username ? 
			<b>Welcome Back, {user.username}</b> : 
			<>
				<Link to='/login' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="primary" variant="contained">Log in</Button>
				</Link>
				<Link to='/signup' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="primary" variant="contained">Sign up</Button>
				</Link>
				
				</>
			}
		</div>
	);
}

export default Home;
