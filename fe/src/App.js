import logo from './logo.svg';
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import Guest from './pages';
import Login from './pages/auth/Login';
import { AuthContext } from './providers/authProvider';
import { useContext } from "react";

// import LayoutAuth from './pages/auth/LayoutAuth';

function App() {
  const { authUser } = useContext(AuthContext)

  return ( 
    <HashRouter>
      {authUser ? <Guest /> : <Login/>}
      <Guest/>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      newestOnTop={true}
      closeOnClick
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      draggable
      style={{ textAlign: "left" }}
    />
  </HashRouter>
  );
}

export default App;
