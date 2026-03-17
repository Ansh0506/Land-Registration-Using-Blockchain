import React, { useState } from 'react';
import { registerLand } from '../services/api';

const RegisterLand = () => {
    const [formData, setFormData] = useState({
        ulpin: '',
        gpsCoordinates: '',
        parentUlpin: 'NONE', // Defaulting to NONE for new properties
        currentOwnerId: '',
        documentHash: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting to Blockchain...');
        
        try {
            const result = await registerLand(formData);
            ssetStatus(`Success! Asset Registered: \n${JSON.stringify(result, null, 2)}`);
            // Clear the form
            setFormData({ ulpin: '', gpsCoordinates: '', parentUlpin: 'NONE', currentOwnerId: '', documentHash: '' });
        } catch (error) {
            setStatus('Transaction Failed. Check the console.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2> Register New Land Asset</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <input type="text" name="ulpin" placeholder="ULPIN (e.g., MP-JBP-2026-003)" 
                       value={formData.ulpin} onChange={handleChange} required style={{ padding: '8px' }}/>
                       
                <input type="text" name="gpsCoordinates" placeholder="GPS Coordinates" 
                       value={formData.gpsCoordinates} onChange={handleChange} required style={{ padding: '8px' }}/>
                       
                <input type="text" name="currentOwnerId" placeholder="Owner Aadhar ID" 
                       value={formData.currentOwnerId} onChange={handleChange} required style={{ padding: '8px' }}/>
                       
                <input type="text" name="documentHash" placeholder="IPFS Document Hash" 
                       value={formData.documentHash} onChange={handleChange} required style={{ padding: '8px' }}/>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Register on Ledger
                </button>
            </form>
            {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
        </div>
    );
};

export default RegisterLand;