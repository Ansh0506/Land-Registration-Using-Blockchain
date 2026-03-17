import axios from 'axios';

// This points directly to your Spring Boot API Gateway
const API_URL = 'http://localhost:8080/api/land';

export const registerLand = async (landData) => {
    try {
        const response = await axios.post(API_URL, landData);
        return response.data;
    } catch (error) {
        console.error("Error registering land:", error);
        throw error;
    }
};

export const getLandByUlpin = async (ulpin) => {
    try {
        const response = await axios.get(`${API_URL}/${ulpin}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching land:", error);
        throw error;
    }
};

export const transferOwnership = async (ulpin, newOwnerId) => {
    try {
        const response = await axios.put(`${API_URL}/${ulpin}/transfer`, { newOwnerId });
        return response.data;
    } catch (error) {
        console.error("Error transferring land:", error);
        throw error;
    }
};