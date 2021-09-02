import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from '@material-ui/core';
import './SignUp.css';
import { Redirect } from 'react-router-dom';

function SignUp({ signup, token }) {
	const initialFormData = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: ''
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
		signup(formData);
	};
	return token ? (
		<Redirect to="/" />
	) : (
		<div className="SignUp">
			<div className="SignUp-body">
				<h1>Sign Up</h1>
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
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
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

export default SignUp;
