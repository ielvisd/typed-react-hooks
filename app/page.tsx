// The following line is needed to make this a client component
"use client";

// Import useState hook, only available in client components
import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
export default App;
