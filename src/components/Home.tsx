import './Home.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  name: string;
  icon: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const games: Game[] = [
    { id: 'pokemon', name: 'Pokémon', icon: '🔴' },
    { id: 'genshin', name: 'Genshin Impact', icon: '⭐' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️' },
    { id: 'mario', name: 'Mario', icon: '🍄' },
  ];

  const handleGameClick = (gameId: string) => {
    navigate(`/${gameId}/guess-stats`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          🎮 GameGuessr
        </h1>
        <p className="text-xl text-blue-100 text-center mb-12">
          Testez vos connaissances sur vos jeux préférés
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game.id)}
              className="group relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{game.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {game.name}
                </h2>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Devinez les stats →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
