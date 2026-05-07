const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
const url = require('url');

// Disable hardware acceleration warnings
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 600,
    icon: path.join(__dirname, '../build/icon.ico'),
    title: 'Vyuhaa Video Studio',
    backgroundColor: '#0f172a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Required for SharedArrayBuffer (FFmpeg.wasm)
      additionalArguments: ['--enable-features=SharedArrayBuffer'],
    },
    show: false, // Don't show until ready
  });

  // Required headers for SharedArrayBuffer / FFmpeg.wasm
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Cross-Origin-Opener-Policy': ['same-origin'],
        'Cross-Origin-Embedder-Policy': ['require-corp'],
      },
    });
  });

  // Load the app
  const startUrl = url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  // Show window when ready to avoid flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// Custom menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New Project', accelerator: 'CmdOrCtrl+N', click: () => mainWindow.webContents.send('new-project') },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Fullscreen', accelerator: 'F11', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: 'Zoom In', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'Reset Zoom', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Visit Vyuhaa Med Data', click: () => shell.openExternal('https://www.vyuhaadata.com') },
        { label: 'About Vyuhaa Video Studio', click: () => {
          const { dialog } = require('electron');
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            icon: path.join(__dirname, '../build/icon.ico'),
            title: 'About Vyuhaa Video Studio',
            message: 'Vyuhaa Video Studio',
            detail: `Version: ${app.getVersion()}\n\nA professional browser-based video editor for medical researchers and medtech teams.\n\nBuilt on OpenReel · Powered by Vyuhaa Med Data\n\nwww.vyuhaadata.com`,
          });
        }},
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  // Enable features needed for WebCodecs and SharedArrayBuffer
  app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer,WebCodecs,WebGPU');
  app.commandLine.appendSwitch('ignore-gpu-blacklist');

  createMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
