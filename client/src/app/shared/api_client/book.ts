import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface book {
	Title: string;
	Author: string;
	Genre: string;
}

interface BookService {
	list(): AxiosResponse<any>;
	get(id: number): AxiosResponse<any>;
	create(book: book): AxiosResponse<any>;
	update(id: number, book: book): AxiosResponse<any>;
	remove(id: number): AxiosResponse<any>;
}

namespace BookService {
	export const list = async () => {
		const config: AxiosRequestConfig = {
			method: 'get',
			url: 'http://localhost:8080/book',
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};

	export const get = async (id: number) => {
		const config: AxiosRequestConfig = {
			method: 'get',
			url: `http://localhost:8080/book/id=${id}`,
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};

	export const create = async (book: book) => {
		const data = {
			'title': book.Title,
			'author': book.Author,
			'genre': book.Genre,
		};

		const config: AxiosRequestConfig = {
			method: 'post',
			url: 'http://localhost:8080/book',
			headers: { 'Content-Type': 'application/json' },
			responseType: 'json',
			data: data,
		};

		const response = await axios(config);
		return response.data;
	};

	export const update = async (id: number, book: book) => {
		const data = {
			'title': book.Title,
			'author': book.Author,
			'genre': book.Genre,
		};

		const config: AxiosRequestConfig = {
			method: 'patch',
			url: `http://localhost:8080/book/id=${id}`,
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
			url: `http://localhost:8080/book/id=${id}`,
			responseType: 'json',
		};

		const response = await axios(config);
		return response.data;
	};
}

export type { book };
export { BookService };
