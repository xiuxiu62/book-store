import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fca6ff',
			light: '#dddddd',
			dark: '#222222',
		},
		secondary: {
			main: '#6d2390',
		},

		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
});

export { theme };
