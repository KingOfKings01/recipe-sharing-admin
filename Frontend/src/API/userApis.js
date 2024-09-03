import axios from 'axios';

// Base API URL
const API_URL = `${import.meta.env.VITE_API}/users`;

// Function to get all users
export async function getAllUsers() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || 'Something went wrong while fetching users. Please try again later.'
    );
  }
}

// Function to approve a user
export async function approveUser(userId) {
  try {
    const response = await axios.post(`${API_URL}/approve/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || 'Something went wrong while approving the user. Please try again later.'
    );
  }
}

// Function to ban a user
export async function banUser(userId) {
  try {
    const response = await axios.post(`${API_URL}/ban/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || 'Something went wrong while banning the user. Please try again later.'
    );
  }
}
