import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalStorage } from './components/GlobalStorage';
//import App from './App.jsx';
import Login from './screens/Login';
import Register from './screens/Register';
import Versions from './screens/Versions';
import Books from './screens/Books';
import Chapters from './screens/Chapters';
import Verses from './screens/Verses';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<GlobalStorage>
				<Login />
			</GlobalStorage>
		)
	},
	{
		path: '/register',
		element: (
			<GlobalStorage>
				<Register />
			</GlobalStorage>
		)
	},
	{
		path: '/versions',
		element: (
			<GlobalStorage>
				<Versions />
			</GlobalStorage>
		)
	},
	{
		path: '/books',
		element: (
			<GlobalStorage>
				<Books />
			</GlobalStorage>
		)
	},
	{
		path: '/chapters',
		element: (
			<GlobalStorage>
				<Chapters />
			</GlobalStorage>
		)
	},
	{
		path: '/verses',
		element: (
			<GlobalStorage>
				<Verses />
			</GlobalStorage>
		)
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/*<App />*/}
		<RouterProvider router={router} />
	</React.StrictMode>
);
