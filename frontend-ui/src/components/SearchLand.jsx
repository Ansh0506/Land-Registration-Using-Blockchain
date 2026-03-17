import React, { useState } from 'react';
import { getLandByUlpin } from '../services/api';

const SearchLand = () => {
    const [searchUlpin, setSearchUlpin] = useState('');
    const [landData, setLandData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLandData(null);
        
        try {
            const result = await getLandByUlpin(searchUlpin);
            setLandData(result);
        } catch (err) {
            setError('Asset not found or error connecting to ledger.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>🔍 Search Land Registry</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Enter ULPIN..." 
                    value={searchUlpin} 
                    onChange={(e) => setSearchUlpin(e.target.value)} 
                    required 
                    style={{ flex: 1, padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Search Ledger
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

            {landData && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', textAlign: 'left' }}>
                    <h3 style={{ marginTop: 0 }}> Immutable Record</h3>
                    <p><strong>ULPIN:</strong> {landData.ulpin}</p>
                    <p><strong>Status:</strong> <span style={{ color: landData.status === 'ACTIVE' ? 'green' : 'orange' }}>{landData.status}</span></p>
                    <p><strong>Owner Aadhar:</strong> {landData.currentOwnerId}</p>
                    <p><strong>Coordinates:</strong> {landData.gpsCoordinates}</p>
                    <p><strong>Parent Plot:</strong> {landData.parentUlpin}</p>
                    <p><strong>IPFS Hash:</strong> {landData.documentHash}</p>
                </div>
            )}
        </div>
    );
};

export default SearchLand;