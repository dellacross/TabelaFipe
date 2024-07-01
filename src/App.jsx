import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/Main';
import AuthProvider from './context/provider';
import SearchResultContainer from './pages/SearchResult';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import ModelPage from './pages/ModelPage';
import ComparePage from './pages/ComparePage';
import Rankings from './pages/Rankings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route 
            exact path="/" 
            element={<MainPage />} 
          />

          <Route 
            exact path="/result" 
            element={<SearchResultContainer />} 
          />

          <Route 
            exact path="/login" 
            element={<LoginPage />} 
          />

          <Route 
            exact path="/perfil" 
            element={<Profile />} 
          />

          <Route 
            exact path="/modelo" 
            element={<ModelPage />} 
          />

          <Route 
            exact path="/compare" 
            element={<ComparePage />} 
          />

          <Route 
            exact path="/rankings" 
            element={<Rankings />} 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;