import axios, { AxiosRequestConfig } from 'axios';

import { baseUrl } from './config';

interface book {
	Id?: number;
	Title: string;
	Author: string;
	Genre: string;
}

const list = async (): Promise<Array<object>> => {
	const config: AxiosRequestConfig = {
		method: 'get',
		url: `${baseUrl}/book`,
		responseType: 'json',
	};

	const response = await axios(config);
	return response.data;
};

const get = async (id: number): Promise<object> => {
	const config: AxiosRequestConfig = {
		method: 'get',
		url: `${baseUrl}/book/id=${id}`,
		responseType: 'json',
	};

	const response = await axios(config);
	return response.data;
};

const create = async (book: book): Promise<object> => {
	const data = {
		'title': book.Title,
		'author': book.Author,
		'genre': book.Genre,
	};

	const config: AxiosRequestConfig = {
		method: 'post',
		url: `${baseUrl}/book`,
		headers: { 'Content-Type': 'application/json' },
		responseType: 'json',
		data: data,
	};

	const response = await axios(config);
	return response.data;
};

const update = async (id: number, book: book): Promise<object> => {
	const data = {
		'title': book.Title,
		'author': book.Author,
		'genre': book.Genre,
	};

	const config: AxiosRequestConfig = {
		method: 'patch',
		url: `${baseUrl}/book/id=${id}`,
		headers: { 'Content-Type': 'application/json' },
		responseType: 'json',
		data: data,
	};

	const response = await axios(config);
	return response.data;
};

const remove = async (id: number): Promise<object> => {
	const config: AxiosRequestConfig = {
		method: 'delete',
		url: `${baseUrl}/book/id=${id}`,
		responseType: 'json',
	};

	const response = await axios(config);
	return response.data;
};

export type { book };
export { list, get, create, update, remove };
