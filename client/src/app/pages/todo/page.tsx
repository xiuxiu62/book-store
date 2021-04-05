import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	Input,
	Typography,
} from '@material-ui/core';
import { item, TodoListView } from './view';

const TodoPage = () => {
	const [items, setItems]: [Array<item>, any] = useState([]);
	const [value, setValue]: [string, any] = useState('');

	const update = (i: Array<item>) => setItems(i);
	const add = (i: string) => {
		let copy: Array<item> = items;
		const newItem: item = {
			id: uuid(),
			value: i,
			checked: false,
		};

		copy.push(newItem);
		update(copy);
	};
	const remove = (i: item) => {
		let updated: Array<item> = items.filter((item) => item !== i);
		update(updated);
	};

	const changeHandler = (i: string) => setValue(i);
	const removeHandler = (item: item) => remove(item);
	const submissionHandler = (i: string) => {
		if (i !== '') {
			add(i);
		}
		setValue('');
	};

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
							Todo List
						</Typography>
						<TodoListView
							items={items}
							removeHandler={removeHandler}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter item..."
							value={value}
							onChange={(e) => changeHandler(e.target.value)}
						/>
						<Button
							style={{
								marginTop: '1rem',
								backgroundColor: '#dddddd',
							}}
							onClick={() => submissionHandler(value)}
						>
							Submit
						</Button>
					</FormControl>
				</CardContent>
			</Card>
		</Grid>
	);
};

export { TodoPage };
