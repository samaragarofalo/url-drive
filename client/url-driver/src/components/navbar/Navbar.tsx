import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          File Manager
        </Typography>
        <Button color="inherit" href="/signup">Sign Up</Button>
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/files">Files</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
