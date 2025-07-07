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
  // Bonus tile will be injected
];

function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}


interface MindfulnessBingoProps {
  externalPoints?: number;
  setExternalPoints?: (points: number) => void;
  hideHeader?: boolean;
}


const bonusTiles = [
  { label: '🎁 Bonus: Double Points!', img: '', bonus: 'double' },
  { label: '🎉 Bonus: Free Tile!', img: '', bonus: 'free' },
  { label: '✨ Bonus: Instant Bingo!', img: '', bonus: 'bingo' },
];

const MindfulnessBingo: React.FC<MindfulnessBingoProps> = ({ externalPoints, setExternalPoints, hideHeader }) => {
  // 3x3 grid
  const [completed, setCompleted] = useState<boolean[]>(Array(9).fill(false));
  const [points, setPoints] = useState<number>(externalPoints ?? 0);
  const [celebrate, setCelebrate] = useState(false);
  const [bonusUsed, setBonusUsed] = useState(false);
  // Pick a random bonus tile and inject into the grid
  const bonusTile = bonusTiles[Math.floor(Math.random() * bonusTiles.length)];
  const baseGrid = shuffle(bingoItems).slice(0, 8);
  const insertAt = Math.floor(Math.random() * 9);
  const grid = [...baseGrid.slice(0, insertAt), bonusTile, ...baseGrid.slice(insertAt)];

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
      let newPoints = points + 10;

      // Bonus tile logic
      if (grid[idx].bonus && !bonusUsed) {
        if (grid[idx].bonus === 'double') {
          newPoints += 10; // Double points for this tile
        } else if (grid[idx].bonus === 'free') {
          // Mark a random uncompleted tile as completed
          const uncompleted = newCompleted.map((v, i) => (!v ? i : null)).filter(v => v !== null && v !== idx);
          if (uncompleted.length > 0) {
            const randomIdx = uncompleted[Math.floor(Math.random() * uncompleted.length)] as number;
            if (typeof randomIdx === 'number') {
              newCompleted[randomIdx] = true;
            }
          }
        } else if (grid[idx].bonus === 'bingo') {
          // Complete the whole grid for instant bingo
          for (let i = 0; i < newCompleted.length; i++) newCompleted[i] = true;
        }
        setBonusUsed(true);
      }

      setCompleted(newCompleted);
      setPoints(newPoints);
      if (setExternalPoints) setExternalPoints(newPoints);
      // Check for bingo
      if (checkBingo(newCompleted)) setCelebrate(true);
    }
  };

  function checkBingo(c: boolean[]) {
    // 3x3 bingo: rows, cols, diags
    for (let i = 0; i < 3; i++) {
      if (c.slice(i * 3, i * 3 + 3).every(Boolean)) return true;
      if ([0, 1, 2].map(j => c[i + j * 3]).every(Boolean)) return true;
    }
    if ([0, 4, 8].map(i => c[i]).every(Boolean)) return true;
    if ([2, 4, 6].map(i => c[i]).every(Boolean)) return true;
    return false;
  }

  return (
    <div className="max-w-md mx-auto py-8 px-2">
      {!hideHeader && <h1 className="text-2xl font-bold mb-4 text-purple-700 text-center">Mindfulness Bingo</h1>}
      <div className="mb-4 text-center text-lg font-semibold text-gray-700">Points: {points}</div>
      <div className="grid grid-cols-3 gap-2 bg-purple-100 p-4 rounded-2xl shadow-lg">
        {grid.map((item, idx) => (
          <button
            key={idx}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 h-24 w-24 mx-auto text-center ${completed[idx] ? 'bg-green-200 border-green-500 scale-95' : 'bg-white border-purple-200 hover:bg-purple-50 hover:scale-105'} ${item.bonus ? 'animate-pulse border-yellow-400' : ''}`}
            onClick={() => handleClick(idx)}
            disabled={completed[idx]}
          >
            {item.img && <img src={item.img} alt={item.label} className="w-10 h-10 mb-2" />}
            <span className="text-xs font-semibold text-gray-800 text-center">{item.label}</span>
            {item.bonus && <span className="block text-yellow-500 text-lg mt-1">★</span>}
            {completed[idx] && <span className="mt-1 text-green-600 text-xl">✔</span>}
          </button>
        ))}
      </div>
      {celebrate && <div className="mt-6 text-2xl text-green-700 font-bold text-center animate-bounce">Bingo! 🎉</div>}
    </div>
  );
};

export default MindfulnessBingo;
