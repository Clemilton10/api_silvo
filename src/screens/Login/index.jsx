import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginApi from './Login';
import { GlobalContext } from '../../components/GlobalStorage';

export default function Login() {
	const global = useContext(GlobalContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const ctLoginApi = new LoginApi();
		const rp = await ctLoginApi.getToken(email);
		if (rp.status_id == 1) {
			global.setToken(rp.status);
			navigate('/versions');
		}
	};

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
				<h1>Login</h1>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input type="button" value="Entrar" onClick={handleLogin} />
				<a
					href={`/register`}
					style={{ display: 'block', textAlign: 'center' }}
				>
					Novo Cadastro
				</a>
			</div>
		</div>
	);
}
