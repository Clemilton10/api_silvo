import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export default function Chapters() {
	const global = useContext(GlobalContext);
	const navigate = useNavigate();

	const [chapters, setChapters] = useState([]);

	const handleChapters = async () => {
		const ctBibleApi = new BibleApi();
		const rp = await ctBibleApi.getChapters(global.token, global.book);
		let tmp = [];
		for (let i = 0; i < rp.chapters; i++) {
			tmp.push(i + 1);
		}
		console.clear();
		console.log(tmp);
		setChapters(tmp);
	};
	const handleChapter = (chapter) => {
		global.setChapter(chapter);
		navigate('/verses');
	};
	useEffect(() => {
		handleChapters();
	}, []);
	return (
		<div className="login_cover">
			<div className="login_content">
				<img
					src="./public/vite.svg"
					border="0"
					height="100"
					onClick={() => navigate('/')}
					style={{ cursor: 'pointer' }}
				/>
				<h1>Capítulos</h1>
				<div className="books_content">
					{chapters.map((item) => (
						<div
							className="btn"
							key={item}
							onClick={() => {
								handleChapter(item);
							}}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
