import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginApi from '../Login/Login';

export default function Register() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		const ctLoginApi = new LoginApi();
		const rp = await ctLoginApi.register(name, email, password);
		navigate('/');
	};

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
				<h1>Cadastro</h1>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<input type="button" value="Entrar" onClick={handleRegister} />
			</div>
		</div>
	);
}
