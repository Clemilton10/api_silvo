import { useContext, useState } from 'react';

import LoginApi from './Login';
import { GlobalContext } from '../../components/GlobalStorage';

export default function Login({ setPageName }) {
	const global = useContext(GlobalContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const ctLoginApi = new LoginApi();
		const rp = await ctLoginApi.getToken(email);
		if (rp.status_id == 1) {
			global.setToken(rp.status);
			setPageName('Versions');
		}
	};

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
				<h1>Login</h1>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input type="button" value="Entrar" onClick={handleLogin} />
				<a
					style={{
						display: 'block',
						textAlign: 'center',
						cursor: 'pointer'
					}}
					onClick={() => setPageName('Register')}
				>
					Novo Cadastro
				</a>
			</div>
		</div>
	);
}
