const remote = require('@electron/remote');
const app = remote.app;
const { spawn, execFile } = require('child_process');

document.onkeydown = function (e) {
    if (e.key == 'Escape') {
        window.location.replace('index.html')
    }
};

function notifDisplay(a,b) {
    window.alert(b + "\n\n" + a)
}

fetch(app.getPath('userData') + '/games.json')
    .then(response => response.json())
    .then(data => {
        let gameList = document.getElementById("links");
        gameList.innerHTML = "";
        if (data.games.length != 0) {
            data.games.forEach(game => {
                if (game.icon == "" || game.icon == undefined) {
                    game.icon = "../assets/logo_1024.png";
                }

                let li = document.createElement("li");
                let gameButton = document.createElement("button");
                gameButton.style.backgroundImage = `url(${game.icon})`;
                gameButton.className = "play";
                gameButton.innerHTML = `<p>${game.name}</p>`;
                gameButton.onclick = function () {
                    if (gameButton.className == "play") {
                        if (game.enableWine != true) {
                            proc = execFile(game.exec, game.args);
                            gameButton.className = "stop";
                            gameButton.innerHTML = "<p>Stop</p>";
                            proc.on('error', async (err) => {
                                await setTimeout(500)
                                console.log(err)
                                if (err.message.includes('ENOENT')) notifDisplay('Double check where you are pointing the game executable to', 'Cannot find executable')
                                else if (err.message.includes('EACCES')) notifDisplay(`In order to launch ${game.name}, please rerun QroCrown as admin or by running <pre>sudo</pre> when launching QroCrown`, 'Administrator/sudo required!')
                                else notifDisplay(err, 'Failed to launch!')
                                gameButton.className = "play";
                                gameButton.innerHTML = `<p>${game.name}</p>`;
                                console.log(err.message)
                            });
                            proc.on('exit', () => {
                                gameButton.className = "play";
                                gameButton.innerHTML = `<p>${game.name}</p>`;
                            })
                        } else {
                            if (platform == 'win32') notifDisplay('Wine is only available for Mac or Linux', 'Your OS is unsupported');
                            else {
                                var cmdExist = require('command-exists');
                                if (cmdExist('wine')) {
                                    proc = spawn('wine', [game.exec]);
                                    gameButton.className = "stop";
                                    gameButton.innerHTML = "<p>Stop</p>";
                                    proc.on('error', async (err) => {
                                        await setTimeout(500)
                                        console.log(err.message)
                                        if (err.message.includes('ENOENT')) notifDisplay('Double check where you are pointing the game executable to', 'Cannot find executable')
                                        else if (err.message.includes('EACCES')) notifDisplay(`In order to launch ${game.name}, please rerun QroCrown as admin or by running <pre>sudo</pre> when launching QroCrown`, 'Administrator/sudo required!')
                                        else notifDisplay(err, 'Failed to launch!')
                                        notifDisplay(err, 'Failed to launch!')
                                        gameButton.className = "play";
                                        gameButton.innerHTML = `<p>${game.name}</p>`;
                                    });
                                    proc.on('exit', () => {
                                        gameButton.className = "play";
                                        gameButton.innerHTML = `<p>${game.name}</p>`;
                                    })
                                } else {
                                    notifDisplay('Wine cannot be searched. Close QroCrown, install wine, then try again.', 'Unsupported!')
                                }
                            }
                        }
                    } else {
                        const { spawn } = require('child_process');
                        console.log("KILLING PROCESS")
                        try {
                            proc.kill();
                        }
                        catch (e) {
                            console.log(e);
                            notifDisplay('Failed to kill process. Try again.', 'Cannot end process')
                        }
                    }
                }
                li.appendChild(gameButton)
                gameList.appendChild(li);
                var smallerlist = new Gridnav('#links');
            });
        }
    })
    .catch((e) => {
        window.alert(e)
        throw new Error("QroCrown_JSON_DAEMON: Hey! You can't do that! You are deleting the core of QroCrown! Reinstall QroCrown to fix this problem, or restart QroCrown.");
        notifDisplay("You are deleting the core data of QroCrown! Reinstall or restart the entire app to fully fix this problem.", "That's illegal!")
    })