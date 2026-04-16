import React, { useState, useEffect } from 'react';
import CurrencyForm from './components/CurrencyForm';
import ResultDisplay from './components/ResultDisplay';
import Counter from './components/Counter';

const API_URL = "https://open.er-api.com/v6/latest"; // Free, no-key API

function App() {
  // Core State
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Counter State
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('conversionCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Load currencies on mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`${API_URL}/USD`);
        if (!response.ok) throw new Error("Failed to fetch rates");
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
        
        // Load last conversion from localStorage if exists
        const lastConversion = localStorage.getItem('lastConversion');
        if (lastConversion) {
          const { amount, from, to, result } = JSON.parse(lastConversion);
          setAmount(amount);
          setFromCurrency(from);
          setToCurrency(to);
          setResult(result);
        }
      } catch (err) {
        setError("Error connecting to currency server.");
        console.error(err);
      }
    };
    fetchCurrencies();
  }, []);

  // Update conversion count in local storage
  useEffect(() => {
    localStorage.setItem('conversionCount', count);
  }, [count]);

  const handleConvert = async () => {
    if (!amount) return;

    setLoading(true);
    setError(null);

    try {
      // Promise-based fetch API
      const response = await fetch(`${API_URL}/${fromCurrency}`);
      
      if (!response.ok) {
        throw new Error("Currency conversion failed. Please try again later.");
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      
      setResult(convertedAmount);
      setCount(prev => prev + 1);

      // Store in localStorage
      localStorage.setItem('lastConversion', JSON.stringify({
        amount,
        from: fromCurrency,
        to: toCurrency,
        result: convertedAmount
      }));
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
    setError(null);
    // Note: We don't reset the count or localStorage currencies here per typical UX
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null); // Clear result as the pair changed
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center">
      <header className="mb-12 text-center fade-in">
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="gradient-text">Currency</span> Converter
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Swift, real-time conversions with premium accuracy and a touch of modern design.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <CurrencyForm 
          amount={amount}
          setAmount={setAmount}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          currencies={currencies}
          handleConvert={handleConvert}
          handleReset={handleReset}
          handleSwap={handleSwap}
        />

        <ResultDisplay 
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          result={result}
          loading={loading}
          error={error}
        />

        <Counter 
          count={count}
          onIncrement={() => setCount(prev => prev + 1)}
          onDecrement={() => setCount(prev => Math.max(0, prev - 1))}
        />
      </main>

      <footer className="mt-20 text-slate-500 text-sm">
        <p>© 2026 CurrencySwift • Powered by exchangerate-api</p>
      </footer>
    </div>
  );
}

export default App;
