import { NavLink } from 'react-router-dom';
import './Home.css'

interface Game {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export const Home: React.FC = () => {

    const games: Game[] = [
        { id: 'pokemon', name: 'Pokemon', icon: '🔴', description: "Catch 'em all! Explore vast regions and discover hundreds of unique Pokemon creatures." },
        { id: 'genshin-impact', name: 'Genshin Impact', icon: '🌟', description: "Explore a breathtaking world of elemental magic and engage in thrilling action combat." },
        { id: 'lol', name: 'League of Legends', icon: '⚔️', description: "Battle in intense 5v5 strategic matches and climb the competitive ranked ladder." },
        { id: 'one-piece', name: 'One Piece', icon: '🏴‍☠️', description: "Embark on an epic journey through the Grand Line and discover the mysteries of the One Piece." },
    ];

    return (
        <div className="home-container">
            {games.map((game) => (
                <NavLink key={game.id} to={`/${game.id}/guess-stats`}>
                    <div className="feature-box">
                        <div className="icon">{game.icon}</div>
                        <h2>{game.name}</h2>
                        <p>{game.description}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}