import './Company.css';
import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import JoblyApi from './api';
import CompanyDetail from './CompanyDetail';
import JobDetail from './JobDetail';
import { v4 as uuid } from 'uuid';

function Company() {
	const { handle } = useParams();
	const [ company, setCompany ] = useState({ jobs: [] });
	useEffect(
		() => {
			JoblyApi.getCompany(handle).then((res) => {
				setCompany(res);
			});
		},
		[ handle ]
	);
	return window.localStorage.getItem('token') === null ? (
		<Redirect to="/" />
	) : (
		<div className="Company">
			<div className="Company-body">
				<h1>Company</h1>
				<br />
				<CompanyDetail company={company} />
				{company.jobs.map((job) => {
					return <JobDetail job={job} key={uuid()} />;
				})}
			</div>
		</div>
	);
}

export default Company;
