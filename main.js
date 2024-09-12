const { app, BrowserWindow, screen, ipcMain, Tray, Menu, nativeImage } = require('electron')
const path = require('path')
let tray
const createWindow = () => {
    const win = new BrowserWindow({
        frame: false,
        transparent: true,
        hasShadow: false,
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'images/icon.ico')
    })

    win.loadFile('index.html')
    windowMove(win)

}

app.whenReady().then(() => {
    const icon = nativeImage.createFromPath('./images/icon_16x16.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: '煤油灯', type: 'radio' },
    ])

    tray = new Tray(icon)

    tray.setContextMenu(contextMenu)
    tray.setToolTip('酷炫电子时钟')
    tray.setTitle('')
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
    createWindow()
})
/**
 * 窗口移动
 * @param win
 */
function windowMove(win) {

    let winStartPosition = { x: 0, y: 0 };
    let mouseStartPosition = { x: 0, y: 0 };
    let movingInterval = null;

    /**
     * 窗口移动事件
     */
    ipcMain.on("window-move-open", (events, canMoving) => {
        if (canMoving) {
            // 读取原位置
            const winPosition = win.getPosition();
            winStartPosition = { x: winPosition[0], y: winPosition[1] };
            mouseStartPosition = screen.getCursorScreenPoint();
            // 清除
            if (movingInterval) {
                clearInterval(movingInterval);
            }
            // 新开
            movingInterval = setInterval(() => {
                // 实时更新位置
                const cursorPosition = screen.getCursorScreenPoint();
                const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;

                const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
                win.setPosition(x, y, true);
            }, 0);
        } else {

            clearInterval(movingInterval);
            movingInterval = null;
        }
    });

}

const dockMenu = Menu.buildFromTemplate([
    {
        label: 'New Window',
        click() { console.log('New Window') }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
    { label: 'New Command...' }
])

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})