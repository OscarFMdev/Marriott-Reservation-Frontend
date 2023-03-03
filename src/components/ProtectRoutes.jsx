import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import token from '../redux/reducer/Auth/token';

const ProtectRoutes = () => {
  const tokenSet = token();
  return tokenSet ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoutes;
