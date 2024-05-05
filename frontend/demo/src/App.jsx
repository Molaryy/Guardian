import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardianLogo from './assets/logo.png'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage"; 
import './App.css'

function HeaderContents() {
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, height: '12%', width: '100%', backgroundColor: 'black', padding: '0px 10px', color: '#fff', }}>
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

  const ResizableTextarea = () => {
    const [prompt, setPrompt] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
  
    const handleChange = (event) => {
      setPrompt(event.target.value);
    };
  
    return (
      <textarea
        value={prompt}
        onChange={handleChange}
        placeholder="Enter your prompt here..."
        style={{ width: '100%', height: textareaHeight, minHeight: '20px', marginRight: '10px' }}
      />
    );
  }

  return (
    <div style={{position:'absolute', top:'20%', left:'50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '90%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
          <label htmlFor="prompt" style={{ textTransform: 'capitalize', padding: '0px 15px' }}></label>
          <ResizableTextarea />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <HeaderContents/>
      </header>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </BrowserRouter> */}
      <FormContents />
      <div style={{ width: '100%', height: '100vh', display: 'flex', padding_left: '100px', margin_left: '100px'}}>
          <img src="https://cdn.discordapp.com/attachments/1235298844007333948/1236449704754286602/img-R1huEPMOt2kasaP98Yia11oN.png?ex=66380d05&is=6636bb85&hm=28801a9b3bf753e37d4011ded685b12098539cf7e5fd21804a9c6ce92d3b08a0&" alt="generated" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    </>
  )
}

export default App
