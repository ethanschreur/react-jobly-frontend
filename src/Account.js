import './Account.css';
import UserContext from './UserContext';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

function Account({ updateProfile }) {
	const [message, setMessage] = useState();
	const user = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: ''
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};
	const handleSubmit = async (e) => {
		if (formData.password !== '') {
			const resp = await updateProfile(formData);
			console.log(resp)
			if (resp){
				setMessage({type: 'success', text: 'Updated succesfully.'});
			} else {
				setMessage({type: 'danger', text: 'Update was unsuccessful.'});
			}
		}
		const newFormData = { ...formData };
		console.log(newFormData);
		setFormData(newFormData);
	};
	useEffect(
		() => {
			setFormData({
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: ''
			});
		},
		[ user ]
	);
	return window.localStorage.getItem('token') === null ? (
		<Redirect to="/" />
	) : (
		<div className="Account">
			<div className="Account-body">
				<h1>Account</h1>
				<br />
				<div>
					<Form className="shadow-lg">
						<Form.Group>
							<Form.Label>
								<b>Username</b>
							</Form.Label>
							<br />
							{user.username}
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>
								<b>First Name</b>
							</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter first name"
								onChange={handleChange}
								name="firstName"
								value={formData.firstName}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>
								<b>Last Name</b>
							</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter last name"
								onChange={handleChange}
								name="lastName"
								value={formData.lastName}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>
								<b>Email address</b>
							</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								onChange={handleChange}
								name="email"
								value={formData.email}
							/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>
								<b>Confirm password:</b>
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
						{ message ? 
						<>
						<Alert variant={message.type}>{message.text}</Alert>
						</>: <></>}
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

export default Account;
