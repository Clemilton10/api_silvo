import { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from './Bible';

export default function Versions({ setPageName }) {
	const global = useContext(GlobalContext);

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
		setPageName('Books');
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
					onClick={() => setPageName('Login')}
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
