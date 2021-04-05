import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type user = {
	Username: string;
	Password?: string;
	Email: string;
	Phone: string;
};

interface UserService {
	list(): AxiosResponse<any>;
	get(id: number): AxiosResponse<any>;
	create(user: user): AxiosResponse<any>;
	update(id: number, user: user): AxiosResponse<any>;
	remove(id: number): AxiosResponse<any>;
}

namespace UserService {
	export const list = async () => {
		const config: AxiosRequestConfig = {
			method: 'get',
			url: 'http://localhost:8080/user',
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};

	export const get = async (id: number) => {
		const config: AxiosRequestConfig = {
			method: 'get',
			url: `http://localhost:8080/user/id=${id}`,
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};

	export const create = async (user: user) => {
		const data = {
			'username': user.Username,
			'password': user.Password,
			'email': user.Email,
			'phone': user.Phone,
		};

		const config: AxiosRequestConfig = {
			method: 'post',
			responseType: 'json',
			data: data,
		};

		const response = await axios(config);
		return response.data;
	};

	export const update = async (id: number, user: user) => {
		const data = {
			'username': user.Username,
			'password': user.Password,
			'email': user.Email,
			'phone': user.Phone,
		};

		const config: AxiosRequestConfig = {
			method: 'patch',
			url: `http://localhost:8080/user/id=${id}`,
			headers: { 'Content-Type': 'application/json' },
			responseType: 'json',
			data: data,
		};

		const response = await axios(config);
		return response.data;
	};

	export const remove = async (id: number) => {
		const config: AxiosRequestConfig = {
			method: 'delete',
			url: `http://localhost:8080/user/id=${id}`,
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};
}

export type { user };
export { UserService };
