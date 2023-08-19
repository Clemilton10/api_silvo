# Bíblia

[Documentação da API da Bíblia](https://github.com/omarciovsena/abibliadigital/blob/master/DOCUMENTATION.md)

<details>
  <summary>Configurações iniciais</summary>

# Configurações iniciais

## instalação

```sh
npm create vite@latest .
npm install
npm install react-router-dom
```

## Porta

package.json

```json
{
	"name": "api_silvo",
	...
	"scripts": {
		"dev": "vite --port 86 --host 127.0.0.1",
		...
	},
	...
}
```

## VS Code

.vscode/settings.json

```json
{
	"git.enabled": false,
	"files.exclude": {
		"node_modules": true,
		".vscode": true,
		".gitignore": true,
		"package.json": true,
		"package-lock.json": true,
		".eslintrc.json": true,
		".eslintrc.cjs": true,
		".prettierrc.json": true,
		"vite.config.js": true
	}
}
```

## Prettier

```json
{
	"trailingComma": "none",
	"tabWidth": 4,
	"semi": true,
	"singleQuote": true,
	"useTabs": true
}
```

</details>

<details>
	<summary>Servidor PHP</summary>

# Servidor PHP

<details>
	<summary>.htaccess</summary>

## .htaccess

```conf
RewriteEngine On
RewriteRule ^save_token$ save_token.php [QSA,L]
RewriteRule ^get_token/(.*)$ get_token.php?email=$1 [QSA,L]
```

</details>

<details>
	<summary>get_token.php</summary>

## get_token.php

```php
<?
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Headers:authorization, content-type, accept, origin");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	exit(0);
}
header('Content-Type: text/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	$emailVerify = $_GET['email'];

	$json_string = file_get_contents('tokens.json');
	$json = json_decode($json_string, true);

	$token = '';

	foreach ($json as $item) {
		if ($item["email"] == $emailVerify) {
			$token = $item['token'];
			break;
		}
	}

	if ($token != '') {
		$json[] = $newItem;
		echo "{\"status\":\"$token\",\"status_id\":1}";
	} else {
		echo "{\"status\":\"Este email ainda não foi cadastrado\",\"status_id\":0}";
	}
} else {
	echo "{\"error\":\"Só é permitido no modo GET\",\"status_id\":0}";
}
```

</details>

<details>
	<summary>save_token.php</summary>

## save_token.php

```php
<?
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Headers:authorization, content-type, accept, origin");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	exit(0);
}
header('Content-Type: text/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$body  = file_get_contents('php://input');
	$body  = json_decode($body, true);
	$email = $body['email'];
	$token = $body['token'];

	$json_string = file_get_contents('tokens.json');
	$json = json_decode($json_string, true);

	$newItem = array("email" => $email, "token" => $token);

	$emailVerify = $newItem["email"];
	$exists = false;

	foreach ($json as $item) {
		if ($item["email"] == $emailVerify) {
			$exists = true;
			break;
		}
	}

	if (!$exists) {
		$json[] = $newItem;
		$fo = fopen('tokens.json', 'w');
		fwrite($fo, json_encode($json));
		fclose($fo);
		echo "{\"status\":\"sucesso\"}";
	} else {
		echo "{\"status\":\"Este email já tem um token cadastrado\"}";
	}
} else {
	echo "{\"status\":\"Só é permitido no modo POST\"}";
}
```

</details>

<details>
	<summary>tokens.json</summary>

## tokens.json

```json
[
	{
		"email": "email@gmail.com",
		"token": "eyJhbG..."
	},
	...
]
```

</details>

</details>
