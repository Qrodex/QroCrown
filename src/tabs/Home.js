import InstantGameCards from '../components/InstantGameCards';
import ExecGameCards from '../components/ExecGameCards';

function Home() {
    return (
        <div>
            <h1>Welcome to QroCrown!</h1>
            <br />
            <h3>Continue playing</h3>
            <ExecGameCards />
            <br />
            <h3>QroCrown exclusives</h3>
            <InstantGameCards jsonurl='https://qrodex.github.io/QroGamesRepo/'/>
            <br />
            <h3>Instant games from AB Studios</h3>
            <InstantGameCards jsonurl='https://bobuxstation.github.io/Coal-Web/games.json'/>
            <br />
            <h3>Instant games from emupedia</h3>
            <InstantGameCards jsonurl='https://mobiz-advanced-technologies.github.io/Mobiz-Advanced-Coal-Launcher-Repositories/emupedia/'/>
        </div>
    );
}

export default Home;