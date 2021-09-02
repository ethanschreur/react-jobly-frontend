import { Redirect } from 'react-router-dom';

function LogOut({ logout }) {
	logout();
	return <Redirect to="/" />;
}

export default LogOut;
