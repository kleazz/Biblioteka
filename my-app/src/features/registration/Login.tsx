import React, { useState } from 'react';
import { ILogin } from '../../app/layout/models/login';

interface IProps {
 login: ILogin;
 createLogin: (login: ILogin) => void;
}

const Login: React.FC<IProps> = ({createLogin }) => {
  const [login, setLogin]=useState<ILogin>({
    username: "",
    password: ""
  });

  const handleSubmit =() =>{
    let newLogin ={
        ...login,
    }
    createLogin(newLogin);
  }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" value={login.username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
