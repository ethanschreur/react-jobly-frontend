import { v4 as uuid } from 'uuid';
import JobDetail from './JobDetail';
function JobList({ jobs }) {
	return (
		<div className="JobList">
			<div className="JobList-body">
				{jobs.map((job) => {
					return <JobDetail job={job} showCompanyName={true} key={uuid()} />;
				})}
			</div>
		</div>
	);
}

export default JobList;
