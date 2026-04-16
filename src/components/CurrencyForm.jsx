import React from 'react';

const CurrencyForm = ({ 
  amount, 
  setAmount, 
  fromCurrency, 
  setFromCurrency, 
  toCurrency, 
  setToCurrency, 
  currencies, 
  handleConvert, 
  handleReset, 
  handleSwap 
}) => {
  return (
    <div className="p-8 glass-card fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Amount Input */}
        <div className="flex flex-col text-left gap-2">
          <label className="text-slate-400 text-sm font-medium ml-1">Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full"
            min="0"
          />
        </div>

        {/* Currencies and Swap */}
        <div className="flex flex-col md:col-span-2 gap-2">
          <label className="text-slate-400 text-sm font-medium ml-1 text-left">Currency Pair</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select 
              value={fromCurrency} 
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full sm:w-1/2"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>

            <button 
              onClick={handleSwap}
              type="button"
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-all hover:rotate-180"
              title="Swap currencies"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
            </button>

            <select 
              value={toCurrency} 
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full sm:w-1/2"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleConvert}
          disabled={!amount || parseFloat(amount) <= 0}
          className="btn-primary w-full sm:w-auto px-12"
        >
          Convert
        </button>
        <button 
          onClick={handleReset}
          className="btn-outline w-full sm:w-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CurrencyForm;
