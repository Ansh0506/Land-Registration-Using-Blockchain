import React, { useState } from 'react';
import { transferOwnership } from '../services/api';

const TransferLand = () => {
    const [formData, setFormData] = useState({
        ulpin: '',
        newOwnerId: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Initiating Transfer on Blockchain...');
        
        try {
            const result = await transferOwnership(formData.ulpin, formData.newOwnerId);
            setStatus(`Transfer Successful! \n${JSON.stringify(result, null, 2)}`);
            setFormData({ ulpin: '', newOwnerId: '' });
        } catch (error) {
            setStatus('Transfer Failed. Check Spring Boot logs for details.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Transfer Ownership</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <input type="text" name="ulpin" placeholder="Target ULPIN (e.g., MP-JBP-2026-003)" 
                       value={formData.ulpin} onChange={handleChange} required style={{ padding: '8px' }}/>
                       
                <input type="text" name="newOwnerId" placeholder="New Owner Aadhar ID" 
                       value={formData.newOwnerId} onChange={handleChange} required style={{ padding: '8px' }}/>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#ff9800', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Execute Transfer
                </button>
            </form>
            {status && <pre style={{ marginTop: '15px', fontWeight: 'bold', whiteSpace: 'pre-wrap', textAlign: 'left' }}>{status}</pre>}
        </div>
    );
};

export default TransferLand;