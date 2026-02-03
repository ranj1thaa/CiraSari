import React from 'react'
import { useContexts } from '../../contexts/Context'
import { Navigate } from 'react-router-dom';
import '../../style/protectRoute.css';

const AllUserOnlyProtect = ({ children }) => {
  const { user, loading } = useContexts();

  if (loading) {
    return (
      <div className="protect-wrapper">
        <div className="loading-spinner"></div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AllUserOnlyProtect;
