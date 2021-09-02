import './CompanyDetail.css';
import { Link } from 'react-router-dom';
function CompanyDetail({ company }) {
	return (
		<div className="CompanyDetail">
			<Link to={`/companies/${company.handle}`}>
				<div className="CompanyDetail-body shadow-sm">
					<h5>{company.name}</h5>
					{company.description}
				</div>
			</Link>
		</div>
	);
}

export default CompanyDetail;
