import React, { useEffect, useState } from 'react';
import { getName, getVersion, getTauriVersion } from '@tauri-apps/api/app';
import { appLocalDataDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/shell';
import errSound from '../assets/button_err.mp3';
import NotifDisplay from '../components/NotifDisplay';

async function executeExecutable(path) {
    await invoke('run_executable', { path: path });
}

function Settings() {
    const [appName, setAppName] = useState('');
    const [appVersion, setAppVersion] = useState('');
    const [tauriVersion, setTauriVersion] = useState('');

    useEffect(() => {
        async function fetchData() {
            const name = await getName();
            const version = await getVersion();
            const tauriVersion = await getTauriVersion();

            setAppName(name);
            setAppVersion(version);
            setTauriVersion(tauriVersion);
        }

        fetchData();
    }, []);

    async function launchWine(e) {
        try {
            await executeExecutable('wine' + e);
        } catch (error) {
            new Audio(errSound).play()
            NotifDisplay("Cannot launch executable", error)
        }
    }

    async function openItem(e) {
        await open(await appLocalDataDir() + e)
    }

    return (
        <div>
            <h1>Settings</h1>
            <h3>General settings</h3>
            <br />
            <p>Manage library</p>
            <pushbutton onClick={() => openItem('games.json')}>Open games.json file</pushbutton>
            <pushbutton onClick={() => openItem('')}>Open game binaries folder</pushbutton>
            <br />
            <p>Wine Settings (Linux, Mac or FreeBSD only)</p>
            <pushbutton onClick={() => launchWine('cfg')}>Wine configuration</pushbutton>
            <pushbutton onClick={() => launchWine('tricks')}>Winetricks</pushbutton>
            <h1>About</h1>
            <h3 style={{ marginBottom: '10px' }}>Client information</h3>
            <p>{appName} version: {appVersion}</p>
            <p>Tauri version: {tauriVersion}</p>
            QroCrown is protected under the GNU Affero General Public License version 3 (GNU AGPLv3).
            <br />
            &copy; 2024 Qrodex
        </div>
    );
}

export default Settings;
