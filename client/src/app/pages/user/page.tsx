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
import { UserListView } from './view';
import { user } from 'src/app/shared/api_client/user';

const UserPage = () => {
	const [users, setUsers]: [Array<user>, any] = useState([]);
	const [username, setUsername]: [string, any] = useState('');
	const [email, setEmail]: [string, any] = useState('');
	const [phone, setPhone]: [string, any] = useState('');

	const changeHandler = (field: string, dispatch: any): void => {
		dispatch(field);
	};

	const submissionHandler = (user: user): void => {
		const copy: Array<user> = users;
		copy.push(user);

		setUsername('');
		setEmail('');
		setPhone('');
		setUsers(copy);
	};

	const removeHandler = (user: user) =>
		setUsers(users.filter((u) => u !== user));

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
							Users
						</Typography>
						<UserListView
							users={users}
							removeHandler={removeHandler}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter username..."
							value={username}
							onChange={(e) =>
								changeHandler(e.target.value, setUsername)
							}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter email..."
							value={email}
							onChange={(e) =>
								changeHandler(e.target.value, setEmail)
							}
						/>
						<Input
							id="todo-input"
							type="text"
							style={{ paddingTop: '1.5rem' }}
							placeholder="Enter phone number..."
							value={phone}
							onChange={(e) =>
								changeHandler(e.target.value, setPhone)
							}
						/>
						<Button
							style={{
								marginTop: '1rem',
								backgroundColor: '#dddddd',
							}}
							onClick={() =>
								submissionHandler({
									Username: username,
									Email: email,
									Phone: phone,
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

export { UserPage };
