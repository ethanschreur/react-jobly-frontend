import './Companies.css';
import { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom'
import JoblyApi from './api';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '@material-ui/core';
import CompanyList from './CompanyList';

function Companies() {
	const [ companies, setCompanies ] = useState(null);
	const [ searchValue, setSearchValue ] = useState('');
	useEffect(() => {
		JoblyApi.getCompanies().then((res) => {
			setCompanies(res);
		});
	}, []);
	const handleChange = (e) => {
        setSearchValue(e.target.value);
    };
	const handleSearch = (e) => {
		e.preventDefault();
		JoblyApi.getCompanies(searchValue).then((res) => {
			setCompanies(res);
		})
	}
	return window.localStorage.getItem('token') === null ?
	<Redirect to="/" /> : (
		<div className="Companies">
			<div className="Companies-body">
				<h1>Companies</h1>
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
				{companies ? <CompanyList companies={companies} /> : <></>}
			</div>
		</div>
	);
}

export default Companies;
