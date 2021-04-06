import { Box, Button, Grid } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { book } from 'src/app/shared/api_client/book';

const BookListView = (props: { books: Array<book>; removeHandler: any }) => {
	const { books, removeHandler } = props;

	return (
		<div>
			{books.map((book) => (
				<BookView book={book} removeHandler={removeHandler} />
			))}
		</div>
	);
};

const BookView = (props: { book: book; removeHandler: any }) => {
	const { book, removeHandler } = props;

	return (
		<Grid
			container
			direction="row"
			justify="flex-start"
			alignItems="center"
			style={{ marginTop: '0.5rem' }}
		>
			<Grid direction="column" style={{ paddingRight: '1rem' }}>
				<Box>{book.Title}</Box>
				<Box>{book.Author}</Box>
				<Box>{book.Genre}</Box>
			</Grid>
			<Button
				style={{ alignSelf: 'right' }}
				onClick={() => removeHandler(book)}
			>
				<CloseOutlined />
			</Button>
		</Grid>
	);
};

export { BookListView };
