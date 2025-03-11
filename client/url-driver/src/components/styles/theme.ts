import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '2rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                    padding: '0.75rem',
                },
            },
        },
    },
});

export default darkTheme;
