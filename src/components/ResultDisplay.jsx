import React from 'react';

const ResultDisplay = ({ amount, fromCurrency, toCurrency, result, loading, error }) => {
  if (loading) {
    return (
      <div className="mt-8 p-6 glass-card fade-in">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <p className="mt-4 text-slate-300">Fetching latest rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-900/40 border border-red-500/50 rounded-2xl fade-in">
        <p className="text-red-200">⚠️ {error}</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mt-8 p-8 glass-card fade-in">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Result</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="text-2xl font-semibold">{amount} {fromCurrency}</span>
          <span className="text-indigo-400 text-3xl">≈</span>
          <span className="text-4xl font-bold gradient-text">{result} {toCurrency}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;
