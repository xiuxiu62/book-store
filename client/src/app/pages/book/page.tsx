import { useState } from 'react';
import { Box, Button, Card, Grid, Input, Typography } from '@material-ui/core';
import { BookListView } from './view';
import { book } from 'src/app/shared/api_client/book';
import * as BookService from 'src/app/shared/api_client/book';

const BookPage = () => {
	const [books, setBooks]: [Array<book>, any] = useState([]);
	const [author, setAuthor]: [string, any] = useState('');
	const [title, setTitle]: [string, any] = useState('');
	const [genre, setGenre]: [string, any] = useState('');

	const changeHandler = (field: string, dispatch: any): void => {
		dispatch(field);
	};

	const submissionHandler = async (book: book) => {
		const copy: Array<book> = books;
		copy.push(book);

		// console.log(await BookService.create(book));

		await BookService.create(book).then((data: Object) => {
			if (data !== null) {
				let book: book = data as book;

				console.log(data);
				console.log(book);
			}
		});

		setAuthor('');
		setTitle('');
		setGenre('');
		setBooks(copy);
	};

	const removeHandler = (book: book) =>
		setBooks(books.filter((b) => b !== book));

	return (
		<Box
			style={{
				marginTop: '1rem',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Card style={{ backgroundColor: '#e6e6e6', padding: '2rem' }}>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column"
				>
					<Typography
						variant="h5"
						component="h2"
						align="center"
						style={{
							borderBottom: '0.5px solid rgba(0, 0, 0, .2)',
						}}
					>
						Books
					</Typography>
					<BookListView books={books} removeHandler={removeHandler} />
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter title..."
						value={title}
						onChange={(e) =>
							changeHandler(e.target.value, setTitle)
						}
					/>
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter author..."
						value={author}
						onChange={(e) =>
							changeHandler(e.target.value, setAuthor)
						}
					/>
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter genre..."
						value={genre}
						onChange={(e) =>
							changeHandler(e.target.value, setGenre)
						}
					/>
					<Button
						style={{
							marginTop: '1rem',
							backgroundColor: '#dddddd',
						}}
						onClick={() =>
							submissionHandler({
								Title: title,
								Author: author,
								Genre: genre,
							})
						}
					>
						Submit
					</Button>
				</Grid>
			</Card>
		</Box>
	);
};

export { BookPage };
