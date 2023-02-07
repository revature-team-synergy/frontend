import React from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm";
import UserView from "./components/UserView";

function App() {
  return (
    <div className="App">
      <RegisterForm />
      <UserView />
    </div>
  );
}

export default App;
