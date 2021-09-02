import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from '@material-ui/core';
import './LogIn.css';
import { Redirect } from 'react-router-dom';

function LogIn({ login, token }) {
	const initialFormData = {
		username: '',
		password: ''
	};
	const [ formData, setFormData ] = useState(initialFormData);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};
	const handleSubmit = async (e) => {
		login(formData);
	};
	return token ? (
		<Redirect to="/" />
	) : (
		<div className="LogIn">
			<div className="LogIn-body">
				<h1>Log In</h1>
				<br />
				<div>
					<Form className="shadow-lg">
						<Form.Group>
							<Form.Label>
								<b>Username</b>
							</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter username"
								onChange={handleChange}
								name="username"
								value={formData.username}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>
								<b>Password</b>
							</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Enter password"
								onChange={handleChange}
								name="password"
								value={formData.password}
							/>
						</Form.Group>
						<br />
						<Button
							className="submit-btn"
							onClick={handleSubmit}
							style={{ textTransform: 'none', margin: '10px' }}
							color="primary"
							variant="contained"
						>
							<b>Submit</b>
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default LogIn;
