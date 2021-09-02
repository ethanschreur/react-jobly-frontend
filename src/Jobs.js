import './Jobs.css';
import { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom'
import JoblyApi from './api';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '@material-ui/core';
import JobList from './JobList';

function Jobs() {
	const [ jobs, setJobs ] = useState(null);
	const [ searchValue, setSearchValue ] = useState('');
	useEffect(() => {
		JoblyApi.getJobs().then((res) => {
			setJobs(res);
		});
	}, []);
	const handleChange = (e) => {
        setSearchValue(e.target.value);
    };
	const handleSearch = (e) => {
		e.preventDefault();
		JoblyApi.getJobs(searchValue).then((res) => {
			setJobs(res);
		})
	}
	return window.localStorage.getItem('token') === null ?
	<Redirect to="/" /> :  (
		<div className="Jobs">
			<div className="Jobs-body">
				<h1>Jobs</h1>
				<br />
				<Form className="shadow-sm">
					<InputGroup>
						<Form.Control
							required
							type="text"
							placeholder="Search"
							onChange={handleChange}
							name="search"
							value={searchValue}
						/>
						<Button
							onClick={handleSearch}
							style={{ textTransform: 'none' }}
							color="primary"
							variant="contained"
						>
							<b>Search</b>
						</Button>
					</InputGroup>
				</Form>
				<br />
				{jobs ? <JobList jobs={jobs} /> : <></>}
			</div>
		</div>
	);
}

export default Jobs;
