import { NavLink } from 'react-router-dom';
import './Home2.css'

interface Game {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export const Home2: React.FC = () => {

    const games: Game[] = [
        { id: 'pokemon', name: 'Pokemon', icon: '🔴', description: "Catch 'em all! Explore vast regions and discover hundreds of unique Pokemon creatures." },
        { id: 'genshin-impact', name: 'Genshin Impact', icon: '🌟', description: "Explore a breathtaking world of elemental magic and engage in thrilling action combat." },
        { id: 'mario', name: 'Mario', icon: '🍄', description: "Jump through colorful platforms and save the princess in iconic adventure levels." },
        { id: 'lol', name: 'League of Legends', icon: '⚔️', description: "Battle in intense 5v5 strategic matches and climb the competitive ranked ladder." },
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