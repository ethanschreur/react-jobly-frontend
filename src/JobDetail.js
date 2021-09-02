import './JobDetail.css';
import { Button } from '@material-ui/core';
import JoblyApi from './api';
import UserContext from './UserContext';
import { useContext, useState, useEffect } from 'react';
function JobDetail({ job, showCompanyName }) {
	const user = useContext(UserContext)
	const [blnApplied, setBlnApplied] = useState(user.applications.includes(job.id));
	const applyJob = () => {
		const stored_token = window.localStorage.getItem('token')
		JoblyApi.token = stored_token;
		JoblyApi.applyJob(user.username, job.id);
		setBlnApplied(true);
	}
	return (
		<div className="JobDetail">
			<div className="JobDetail-body shadow-sm">
				<h5>{job.title}</h5>
					{showCompanyName ? 
				<>
					{job.companyName}
					<br/>
				</>
				: <></>}
				<br />
				Salary: {job.salary}
				<br />
				Equity: {job.equity}
				<div className="JobDetail-applyButton">
					<div></div>
					<Button onClick={applyJob} style={{textTransform: 'none', margin: '10px'}} color="secondary" variant="contained" disabled={blnApplied}><b>{blnApplied ? "Applied" : "Apply"}</b></Button>
				</div>
			</div>
		</div>
	);
}

export default JobDetail;
