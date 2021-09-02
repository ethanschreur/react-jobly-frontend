import { v4 as uuid } from 'uuid';
import CompanyDetail from './CompanyDetail';
function CompanyList({ companies }) {
	return (
		<div className="CompanyList">
			<div className="CompanyList-body">
				{companies.map((company) => {
					return <CompanyDetail company={company} key={uuid()} />;
				})}
			</div>
		</div>
	);
}

export default CompanyList;
