import { useState } from 'react'
import GuardianLogo from './assets/logo.png'
import './App.css'

function HeaderContents() {
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, height: '12%', width: '100%', backgroundColor: 'black', padding: '0px 10px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/">
            <img src={GuardianLogo} className="logo" alt="Guardian logo" draggable={false} />
          </a>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Generate</a></li>
            <li><a href="/">Login</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

function FormContents() {
  const [prompt, setPrompt] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/openai/endpoint", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });
      let resJson = await res.json();
      if (res.status != 200) {
        console.log("There was an error:")
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
    setPrompt("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <label to="prompt" autoCapitalize='true'>Enter your prompt:</label>
        <textarea
          id="prompt"
          value={prompt}
          placeholder="..."
          cols={60}
          onChange={(e) => setPrompt(e.target.value)}
        />
      <button onClick={handleSubmit} href="/">Submit</button>
    </form>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header><HeaderContents/></header>
      <br/>
      <FormContents />
      <br/>
        
    </>
  )
}

export default App
