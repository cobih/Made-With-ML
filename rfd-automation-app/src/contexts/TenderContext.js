import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TenderContext = createContext(null);

export const TenderProvider = ({ children }) => {
  const [tenders, setTenders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTenders();
    }
  }, [user]);

  const fetchTenders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tenders');
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };

  const createTender = async (title, description) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tenders', { title, description });
      setTenders([...tenders, response.data]);
      return true;
    } catch (error) {
      console.error('Error creating tender:', error);
      return false;
    }
  };

  return (
    <TenderContext.Provider value={{ tenders, createTender, fetchTenders }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTenders = () => useContext(TenderContext);