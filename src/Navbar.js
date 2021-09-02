import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Navbar.css'
import UserContext from './UserContext';
import {useContext} from 'react';

function Navbar() {
	const user = useContext(UserContext);
	return (
		<div className="Navbar shadow-sm">
			<div>
				<Link to='/' className="Navbar-home">
					<img className="Navbar-logo" src={''} alt="" width="50"></img>
					<b className="Navbar-name">Jobly</b>
				</Link>
			</div>
			<div className="Navbar-end">
			{user.username ?
			<div>
				<Link to='/jobs' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="primary" variant="contained"><b>Jobs</b></Button>
				</Link>
				<Link to='/companies' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="primary" variant="contained"><b>Companies</b></Button>
				</Link>
			</div>
			:
			<></>
			}
				{!user.username ? 
				<>
				<Link to='/login' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="secondary" variant="contained"><b>Log in</b></Button>
				</Link>
				<Link to='/signup' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="secondary" variant="contained"><b>Sign up</b></Button>
				</Link>
				</>
				:
				<>
				<Link to='/account' style={{textDecoration: 'none'}}>
					<Button style={{textTransform: 'none', margin: '10px'}} color="secondary" variant="contained"><b>Account</b></Button>
				</Link>
				<Link to="/logout">
					<Button style={{textTransform: 'none', margin: '10px'}} color="secondary" variant="text"><b>Log out {user.username}</b></Button>
				</Link>
				</>
				}
			</div>
		</div>
	);
}

export default Navbar;
