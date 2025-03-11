import React, { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (formData: { username: string; email?: string; password: string }) => void;
  showEmail?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit, showEmail = false }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {showEmail && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default AuthForm;