import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from './config';

type user = {
	ID?: number;
	username: string;
	password?: string;
	email: string;
	phone: string;
};

const fromJson = (user: user): Promise<user> =>
	Object.create({
		ID: user.ID,
		username: user.username,
		phone: user.phone,
		email: user.email,
	});

const list = async (): Promise<Array<user>> => {
	try {
		const config: AxiosRequestConfig = {
			method: 'get',
			url: `${baseUrl}/user`,
			responseType: 'json',
		};

		const response = await axios(config);
		if (response.status !== 200) {
			throw new Error('trouble accessing users');
		}

		const userList: Array<user> = await response.data.map((u: user) =>
			fromJson(u)
		);

		return userList;
	} catch (e) {
		throw e;
	}
};

const get = async (id: string): Promise<user> => {
	const config: AxiosRequestConfig = {
		method: 'get',
		url: `${baseUrl}/user/id=${id}`,
		responseType: 'json',
	};

	const response = await axios(config);
	return response.data;
};

const create = async (u: user): Promise<user> => {
	const data: user = {
		username: u.username,
		password: u.password,
		email: u.email,
		phone: u.phone,
	};

	const config: AxiosRequestConfig = {
		method: 'post',
		url: `${baseUrl}/user`,
		responseType: 'json',
		data: data,
	};

	const response = await axios(config);
	if (response.status !== 200) {
		throw new Error('trouble accessing users');
	}

	const user = await fromJson(response.data);
	console.log(user);

	return user;
};

const update = async (id: number, user: user): Promise<user> => {
	const data = {
		'username': user.username,
		'password': user.password,
		'email': user.email,
		'phone': user.phone,
	};

	const config: AxiosRequestConfig = {
		method: 'patch',
		url: `${baseUrl}/user/id=${id}`,
		headers: { 'Content-Type': 'application/json' },
		responseType: 'json',
		data: data,
	};

	const response = await axios(config);
	return response.data;
};

const remove = async (id: number): Promise<user> => {
	const config: AxiosRequestConfig = {
		method: 'delete',
		url: `${baseUrl}/user/id=${id}`,
		responseType: 'json',
	};

	const response = await axios(config);
	if (response.status !== 200) {
		throw new Error('trouble accessing users');
	}

	const user: user = await fromJson(response.data);
	console.log(user);

	return user;
};

export type { user };
export { list, get, create, update, remove };
