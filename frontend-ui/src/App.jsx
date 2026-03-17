import React from 'react';
import RegisterLand from './components/RegisterLand';
import SearchLand from './components/SearchLand';
import TransferLand from './components/TransferLand'; // Import the transfer component

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>🏛️ Decentralized Land Registry</h1>
      <p>Hyperledger Fabric + Spring Boot + React</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', alignItems: 'flex-start' }}>
          <RegisterLand />
          <TransferLand />
          <SearchLand />
      </div>
      
    </div>
  );
}

export default App;