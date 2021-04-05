import { useState } from 'react';
import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	Input,
	Typography,
} from '@material-ui/core';
import { BookListView } from './view';
import { book } from 'src/app/shared/api_client/book';

const BookPage = () => {
	const [books, setBooks]: [Array<book>, any] = useState([]);
	const [author, setAuthor]: [string, any] = useState('');
	const [title, setTitle]: [string, any] = useState('');
	const [genre, setGenre]: [string, any] = useState('');

	const changeHandler = (field: string, dispatch: any): void => {
		dispatch(field);
	};

	const submissionHandler = (book: book): void => {
		const copy: Array<book> = books;
		copy.push(book);

		setAuthor('');
		setTitle('');
		setGenre('');
		setBooks(copy);
	};

	const removeHandler = (book: book) =>
		setBooks(books.filter((b) => b !== book));

	return (
		<Grid
			container
			direction="column"
			justify="flex-start"
			alignItems="center"
			style={{
				marginTop: '1rem',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Card style={{ backgroundColor: '#e6e6e6', padding: '1rem' }}>
				<CardContent>
					<FormControl>
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
						<BookListView
							books={books}
							removeHandler={removeHandler}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter title..."
							value={title}
							onChange={(e) =>
								changeHandler(e.target.value, setTitle)
							}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter author..."
							value={author}
							onChange={(e) =>
								changeHandler(e.target.value, setAuthor)
							}
						/>
						<Input
							id="todo-input"
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
					</FormControl>
				</CardContent>
			</Card>
		</Grid>
	);
};

export { BookPage };
