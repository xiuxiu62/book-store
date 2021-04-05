import { Box } from '@material-ui/core';
import { NavBar } from '../components';

const PageWrapper: React.FC = ({ children }) => (
	<Box width="100%" height="100%">
		<NavBar />
		{children}
	</Box>
);

export { PageWrapper };
