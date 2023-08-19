export default class BibleApi {
	async getVersions(token) {
		try {
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`https://www.abibliadigital.com.br/api/versions`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
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
	async getBooks(token) {
		try {
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`https://www.abibliadigital.com.br/api/books`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
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
	async getChapters(token, book) {
		try {
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`https://www.abibliadigital.com.br/api/books/${book}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
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
	async getVerses(token, version, book, chapter) {
		try {
			let controller = new AbortController();
			let tp = setTimeout(() => controller.abort(), 10000);
			const response = await fetch(
				`https://www.abibliadigital.com.br/api/verses/${version}/${book}/${chapter}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
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
