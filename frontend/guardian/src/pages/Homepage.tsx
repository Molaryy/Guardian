// src/pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <body>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h1 style={{ color: '#4a54f1', fontSize: '2.5rem' }}>Welcome to Our Website!</h1>
        <p style={{ maxWidth: '800px', margin: '1rem auto' }}>We offer a variety of services and resources. Explore our site to find more information.</p>
        <h2 style={{ color: '#4a54f1' }}>Our Services</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ margin: '1rem' }}>Service 1</li>
          <li style={{ margin: '1rem' }}>Service 2</li>
          <li style={{ margin: '1rem' }}>Service 3</li>
        </ul>
      </div>
      </body>
  );
}

export default Home;