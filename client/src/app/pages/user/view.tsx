import { Box, Button, Grid } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { user } from 'src/app/shared/api_client/user';

const UserListView = (props: { users: Array<user>; removeHandler: any }) => {
	const { users, removeHandler } = props;

	return (
		<div>
			{users.map((user) => (
				<UserView user={user} removeHandler={removeHandler} />
			))}
		</div>
	);
};

const UserView = (props: { user: user; removeHandler: any }) => {
	const { user, removeHandler } = props;

	return (
		<Grid
			container
			direction="row"
			justify="flex-start"
			alignItems="center"
			style={{ marginTop: '0.5rem' }}
		>
			<Grid direction="column" style={{ paddingRight: '1rem' }}>
				<Box>{user.Username}</Box>
				<Box>{user.Email}</Box>
				<Box>{user.Phone}</Box>
			</Grid>
			<Button
				style={{ alignSelf: 'right' }}
				onClick={() => removeHandler(user)}
			>
				<CloseOutlined />
			</Button>
		</Grid>
	);
};

export { UserListView };
