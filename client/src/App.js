import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Boards from './pages/Boards';
import Board from './pages/Board';
import { getCurrentUser } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <Boards /> : <Navigate to="/signin" />} />
      <Route path="/boards/:id" element={user ? <Board /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
