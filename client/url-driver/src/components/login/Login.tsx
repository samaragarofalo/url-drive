import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../auth/AuthForm';

const Login: React.FC = () => {
    const navigate = useNavigate()

    const handleLogin = async (formData: { username: string; password: string }) => {
        console.log('Login:', formData);
        
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if(!response.ok) {
                throw new Error('There was an error while trying to authenticate.')
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);

            navigate('/files/')

        } catch (error) {
            console.log('There was an error while trying to authenticate: ', error)
            alert('Invalid credentials.')
        }

    };

    return <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />;
};

export default Login;
