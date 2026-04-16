import React from 'react';

const Counter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 glass-card mt-8 fade-in">
      <h3 className="text-xl font-semibold text-slate-300">Conversions Performed</h3>
      <div className="flex items-center gap-6">
        <button 
          onClick={onDecrement}
          className="btn-outline text-2xl w-12 h-12 flex items-center justify-center"
          aria-label="Decrease count"
        >
          -
        </button>
        <span className="text-4xl font-bold gradient-text">{count}</span>
        <button 
          onClick={onIncrement}
          className="btn-outline text-2xl w-12 h-12 flex items-center justify-center"
          aria-label="Increase count"
        >
          +
        </button>
      </div>
      <p className="text-sm text-slate-400">Keep track of your currency queries</p>
    </div>
  );
};

export default Counter;
