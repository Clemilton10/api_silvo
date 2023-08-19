export default class LoginApi {
	async register(name, email, password) {
		try {
			// Cadastrar usuário no site da Bíblia
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`https://www.abibliadigital.com.br/api/users`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password,
						notifications: false
					}),
					signal: controller.signal
				}
			);
			if (!response.ok) {
				throw new Error(`Erro HTTP status: ${response.status}`);
			}
			const json = await response.json();
			clearTimeout(tp);

			if (json.token) {
				// Salvando o token na nossa API(silvo)
				tp = setTimeout(() => controller.abort(), 10000);
				const response2 = await fetch(
					`http://177.47.222.56:88/api_silvo/save_token`,
					{
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-type': 'application/json; charset=UTF-8'
						},
						body: JSON.stringify({
							email: json.email,
							token: json.token
						}),
						signal: controller.signal
					}
				);
				if (!response2.ok) {
					throw new Error(`Erro HTTP status: ${response2.status}`);
				}
				const json2 = await response2.json();
				clearTimeout(tp);
				return json2;
			} else {
				return json;
			}
		} catch (error) {
			return { status: error.message };
		}
	}

	async getToken(email) {
		try {
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`http://177.47.222.56:88/api_silvo/get_token/${email}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-type': 'application/json; charset=UTF-8'
					},
					signal: controller.signal
				}
			);
			if (!response.ok) {
				throw new Error(`Erro HTTP status: ${response.status}`);
			}
			const json = await response.json();
			clearTimeout(tp);
			return json;
		} catch (error) {
			return { status: error.message };
		}
	}
}
