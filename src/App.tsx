import "./App.css";

function App() {
  function handleClick() {
    console.log("Hello from React! Button was clicked.");
  }

  return (
    <main>
      <h1>My First React App</h1>

      <p>
        I am learning React with Vite and TypeScript.
      </p>

      <button onClick={handleClick}>
        Click Me
      </button>
    </main>
  );
}

export default App;