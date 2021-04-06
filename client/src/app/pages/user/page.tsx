import { useState } from 'react';
import { Box, Button, Card, Grid, Input, Typography } from '@material-ui/core';
import { UserListView } from './view';
import { user } from 'src/app/shared/api_client/user';
import * as UserService from 'src/app/shared/api_client/user';

const UserPage = () => {
	const [users, setUsers]: [Array<user>, any] = useState([]);
	const [username, setUsername]: [string, any] = useState('');
	const [password, setPassword]: [string, any] = useState('');
	const [email, setEmail]: [string, any] = useState('');
	const [phone, setPhone]: [string, any] = useState('');

	const changeHandler = (field: string, dispatch: any): void => {
		dispatch(field);
	};

	const testHandler = async () => await UserService.list();
	const submissionHandler = async (user: user) => {
		const copy: Array<user> = users;
		copy.push(user);

		await UserService.create(user);
		setUsers(copy);

		setUsername('');
		setPassword('');
		setEmail('');
		setPhone('');
	};

	const removeHandler = async (user: user) => {
		const userList = await UserService.list();
		const id: number | undefined = userList.filter(
			(u) => u.username === user.username
		)[0].ID;

		await UserService.remove(id!);
		setUsers(users.filter((u) => u !== user));
	};

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
			<Card
				style={{
					backgroundColor: '#e6e6e6',
					padding: '2rem',
				}}
			>
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
						Users
					</Typography>
					<UserListView users={users} removeHandler={removeHandler} />
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter username..."
						value={username}
						onChange={(e) =>
							changeHandler(e.target.value, setUsername)
						}
					/>
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter password..."
						value={password}
						onChange={(e) =>
							changeHandler(e.target.value, setPassword)
						}
					/>
					<Input
						type="text"
						style={{ paddingTop: '1.5rem' }}
						placeholder="Enter email..."
						value={email}
						onChange={(e) =>
							changeHandler(e.target.value, setEmail)
						}
					/>
					<Input
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
								username: username,
								password: password,
								email: email,
								phone: phone,
							})
						}
					>
						Submit
					</Button>
					<Button
						style={{
							marginTop: '1rem',
							backgroundColor: '#dddddd',
						}}
						onClick={() => testHandler()}
					>
						Test
					</Button>
				</Grid>
			</Card>
		</Box>
	);
};

export { UserPage };
