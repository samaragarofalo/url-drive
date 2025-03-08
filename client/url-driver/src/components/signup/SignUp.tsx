import React from 'react';
import AuthForm from '../auth/AuthForm';

const Signup: React.FC = () => {
    const handleSignup = (formData: { username: string; email: string; password: string }) => {
        console.log('Signup:', formData);
        // Signup API
    };

    return <AuthForm title="Cadastro" buttonText="Cadastrar" onSubmit={handleSignup} showEmail />;
};

export default Signup;
