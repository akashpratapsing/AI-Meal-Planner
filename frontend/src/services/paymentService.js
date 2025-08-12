import axios from "axios";

const API_BASE = "http://localhost:8081/api/payments/v1";

export const createOrder = async (plan) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }
    
    const payload = { plan };
    console.log('Creating order with payload:', payload);
    
    const response = await axios.post(`${API_BASE}/create-order`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to create order. Please try again.');
    }
  }
};

export const verifyPayment = async (verificationData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }
    
    console.log('Verifying payment with data:', verificationData);
    
    const response = await axios.post(`${API_BASE}/verify-payment`, verificationData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Payment verified successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data?.errors) {
      // Handle validation errors
      const validationErrors = error.response.data.errors;
      const errorMessages = validationErrors.map(err => `${err.field}: ${err.defaultMessage}`).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to verify payment. Please try again.');
    }
  }
};
