const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({ width: 900, height: 680, show: false });

	const startURL = isDev
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, '../build/index.html')}`;
	mainWindow.loadURL(startURL);
	mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createWindow)
	.on('activate', () => {
		if (mainWindow === null) {
			createWindow();
		}
	})
	.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
