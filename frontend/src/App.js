import './App.css';
import { Outlet } from 'react-router';
import React from 'react';
import { Navigate } from 'react-router'

class App extends React.Component {
  state = {
    user: null,
  }

  handleLogin=(user)=>{
    this.setState({user})
  }

  handleLogout=()=>{
    this.setState({user:null})
  }

  render() {
    return (
      <Outlet context={{ user: this.state.user, onLogin: this.handleLogin, onLogout: this.handleLogout }} />
    )
  }
}

export default App;