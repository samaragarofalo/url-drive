import { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
    });

    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Could not create a new user. Please try again.');
            }

            setMessage({ type: 'success', text: 'Your user was created successfully!' });
            setFormData({ first_name: '', last_name: '', email: '', username: '', password: '' });

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'There was an error trying to connect to a new server.' });
        }
    };

    return (
        <Container 
        maxWidth="sm"
        sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh' 
        }}
        >
            <Paper 
            elevation={3} 
            sx={{ p: 4, mt: 4 }}
            >
                <Typography 
                variant="h4" 
                gutterBottom
                >
                    Sign Up
                </Typography>
                {message && <Stack spacing={2}><Stack direction="row" spacing={3}><Alert severity={message.type}>{message.text}</Alert></Stack></Stack>}
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField 
                            label="First Name" 
                            name="first_name" 
                            fullWidth 
                            onChange={handleChange} 
                            required 
                            />
                            <TextField 
                            label="Last Name" 
                            name="last_name" 
                            fullWidth 
                            onChange={handleChange} 
                            required 
                            />
                        </Stack>
                        <TextField 
                        label="Email" 
                        name="email" 
                        type="email" 
                        fullWidth 
                        margin="normal" 
                        onChange={handleChange} 
                        required 
                        />
                        <TextField 
                        label="Username" 
                        name="username" 
                        fullWidth 
                        margin="normal" 
                        onChange={handleChange} 
                        required />
                        <TextField 
                        label="Password" 
                        name="password" 
                        type={showPassword ? 'text' : 'password'}
                        fullWidth 
                        margin="normal" 
                        onChange={handleChange} 
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
