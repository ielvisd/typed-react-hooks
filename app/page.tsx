"use client"; // This is a client component 👈🏽

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}
export default App;
