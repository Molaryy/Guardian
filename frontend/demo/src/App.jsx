import { useState } from 'react'
import GuardianLogo from './assets/logo.png'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import './App.css'

function HeaderContents() {
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, height: '12%', width: '100%', backgroundColor: 'black', padding: '0px 10px', color: '#fff', display: 'flex', alignItems: 'center'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={GuardianLogo} className="logo" alt="Guardian logo" draggable={false} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-end'}}>
          <ul>
            <li/>
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
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('./src/assets/placeholder.png');

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(import.meta.env.VITE_OPENAI_BACKEND_URL, {
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
        setImage('./src/assets/image_error.png')
      }
    } catch (err) {
      console.log(err);
      setImage('./src/assets/image_error.png')
    }
    setPrompt("")
  };

  return (
    <div style={{position:'absolute', top:'20%', left:'50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '65%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
          <label htmlFor="prompt" style={{ textTransform: 'capitalize', padding: '0px 15px' }}></label>
          <textarea
            value={prompt}
            onChange={handleChange}
            placeholder="Enter your prompt here..."
          /><br/>
        <button type="submit">Submit</button>
      </form>
      <img
        src={image}
        width="300" height="300"
        text-align="left" style={{display:'block'}}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <header>
        <HeaderContents/>
      </header>
      <FormContents />
    </>
  )
}

export default App
