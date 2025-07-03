import React, { useState } from 'react';

const bingoItems = [
  { label: '5 Deep Breaths', img: 'https://cdn-icons-png.flaticon.com/512/1680/1680900.png' },
  { label: 'Go for a Walk', img: 'https://cdn-icons-png.flaticon.com/512/616/616494.png' },
  { label: 'Draw Something', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png' },
  { label: 'Drink Water', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  { label: 'Stretch', img: 'https://cdn-icons-png.flaticon.com/512/1680/1680899.png' },
  { label: 'Meditate 5 min', img: 'https://cdn-icons-png.flaticon.com/512/1680/1680902.png' },
  { label: 'Compliment Someone', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Listen to Music', img: 'https://cdn-icons-png.flaticon.com/512/727/727245.png' },
  { label: 'Read a Book', img: 'https://cdn-icons-png.flaticon.com/512/167/167707.png' },
  { label: 'Try Yoga', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Cook a Meal', img: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
  { label: 'No Phone 1hr', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' },
  { label: 'Nature Time', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Gratitude List', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' },
  { label: 'Smile at Yourself', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Journal', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' },
  { label: 'Dance', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Try a New Recipe', img: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
  { label: 'Random Act of Kindness', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Color Something', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png' },
  { label: 'Cloud Watch', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Try Origami', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png' },
  { label: 'Plant Care', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { label: 'Mindful Eating', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  { label: 'Watch Sunset', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }
];

function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}


interface MindfulnessBingoProps {
  externalPoints?: number;
  setExternalPoints?: (points: number) => void;
  hideHeader?: boolean;
}

const MindfulnessBingo: React.FC<MindfulnessBingoProps> = ({ externalPoints, setExternalPoints, hideHeader }) => {
  const [completed, setCompleted] = useState<boolean[]>(Array(25).fill(false));
  const [points, setPoints] = useState<number>(externalPoints ?? 0);
  const [celebrate, setCelebrate] = useState(false);
  const grid = shuffle(bingoItems).slice(0, 25);

  // Sync local points with externalPoints if provided
  React.useEffect(() => {
    if (typeof externalPoints === 'number' && externalPoints !== points) {
      setPoints(externalPoints);
    }
    // eslint-disable-next-line
  }, [externalPoints]);

  const handleClick = (idx: number) => {
    if (!completed[idx]) {
      const newCompleted = [...completed];
      newCompleted[idx] = true;
      setCompleted(newCompleted);
      const newPoints = points + 10;
      setPoints(newPoints);
      if (setExternalPoints) setExternalPoints(newPoints);
      // Check for bingo
      if (checkBingo(newCompleted)) setCelebrate(true);
    }
  };

  function checkBingo(c: boolean[]) {
    // Check rows, cols, diags
    for (let i = 0; i < 5; i++) {
      if (c.slice(i * 5, i * 5 + 5).every(Boolean)) return true;
      if ([0, 1, 2, 3, 4].map(j => c[i + j * 5]).every(Boolean)) return true;
    }
    if ([0, 6, 12, 18, 24].map(i => c[i]).every(Boolean)) return true;
    if ([4, 8, 12, 16, 20].map(i => c[i]).every(Boolean)) return true;
    return false;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {!hideHeader && <h1 className="text-3xl font-bold mb-4 text-purple-700 text-center">Mindfulness Bingo</h1>}
      <div className="mb-4 text-center text-lg font-semibold text-gray-700">Points: {points}</div>
      <div className="grid grid-cols-5 gap-2 bg-purple-100 p-4 rounded-2xl shadow-lg">
        {grid.map((item, idx) => (
          <button
            key={idx}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 h-28 w-28 mx-auto ${completed[idx] ? 'bg-green-200 border-green-500 scale-95' : 'bg-white border-purple-200 hover:bg-purple-50 hover:scale-105'}`}
            onClick={() => handleClick(idx)}
            disabled={completed[idx]}
          >
            <img src={item.img} alt={item.label} className="w-10 h-10 mb-2" />
            <span className="text-xs font-semibold text-gray-800 text-center">{item.label}</span>
            {completed[idx] && <span className="mt-1 text-green-600 text-xl">✔</span>}
          </button>
        ))}
      </div>
      {celebrate && <div className="mt-6 text-2xl text-green-700 font-bold text-center animate-bounce">Bingo! Bonus Points Awarded!</div>}
    </div>
  );
};

export default MindfulnessBingo;
