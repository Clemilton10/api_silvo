import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from './Bible';

export default function Versions() {
	const global = useContext(GlobalContext);
	const navigate = useNavigate();

	const [versions, setVersions] = useState([]);

	const handleVersions = async () => {
		const ctBibleApi = new BibleApi();
		const rp = await ctBibleApi.getVersions(global.token);
		console.clear();
		console.log(rp);
		setVersions(rp);
	};
	const handleVersion = (version) => {
		global.setVersion(version);
		navigate('/books');
	};
	useEffect(() => {
		handleVersions();
	}, []);
	return (
		<div className="login_cover">
			<div className="login_content">
				<img
					src="/vite.svg"
					border="0"
					height="100"
					onClick={() => navigate('/')}
					style={{ cursor: 'pointer' }}
				/>
				<h1>Versões</h1>
				<div className="books_content">
					{versions.map(({ version }) => (
						<div
							className="btn"
							key={version}
							onClick={() => {
								handleVersion(version);
							}}
						>
							{version}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
