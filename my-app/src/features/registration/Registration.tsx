import React, { useState } from 'react';
import { register } from '../..app/api/agent.tsx';

interface RegistrationProps {
  onRegistrationSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegistrationSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({ username, password, email, name });
      onRegistrationSuccess();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;

