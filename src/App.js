
import AuthForm from './components/Auth/AuthForm';
import React from 'react';
import UserProfile from './components/Profile/UserProfile';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div>
      <Layout/>
      <UserProfile/>
      <AuthForm/>
    </div>
  );
}

export default App;
