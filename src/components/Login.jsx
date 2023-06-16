import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Avatar, Button, Container, TextField, Typography,Box, ButtonGroup} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { Alert, AlertTitle } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {auth,Provider} from '../firebase';
import {signInWithPopup} from 'firebase/auth';
import {FacebookAuthProvider} from "firebase/auth";
export default function Login() {

  const [value,setValue]=useState('');  
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();

  const navigate = useNavigate();

  const onGoogleSignIn=()=>{
    signInWithPopup(auth,Provider).then((data)=>{
        setValue(data.user.email)
        localStorage.setItem("email",data.user.email)        
    })
  }


  const onFacebookSignIn=()=>{
    const Pro=new FacebookAuthProvider();
    signInWithPopup(auth,Pro).then((data)=>{
        setValue(data.user.email)
        localStorage.setItem("email",data.user.email)        
    })
  }

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
    if(value)
    {
        navigate("/");
    }
  })

  async function handleLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      if (currentUser && currentUser.email === "admin@library.com") {
        console.log("Redirecting to dashboard");
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
};
  if (currentUser) return <Navigate to="/" />;

  return (
    
    <Container component="main" maxWidth="sm">
      <Typography variant="h4" mt={4} textAlign="center">
        Library Management System
      </Typography>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,backgroundColor: 'green' }}
          >
            Login
          </Button>
          {error && (
            <Typography textAlign="center" color="error" m={2}>
              Wrong email or password!
            </Typography>
          )}
        </Box>
        <Alert severity="info">
    <AlertTitle>Use login info</AlertTitle>
  Email Address: <strong>admin@library.com</strong>
  <br />
  <br />
  Password: <strong>admin123</strong>
  <br />
  <br />
  <Typography
    variant="outlined"
    component={Link}
    to="/home"
    sx={{
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
    }}
  >
    Go to Home{" "}
    <EastIcon sx={{ verticalAlign: "middle", marginLeft: "5px" }} />
  </Typography>
</Alert>
    <Box sx={{ mt: 1 ,mb:1}}>
    <ButtonGroup fullWidth
            variant="contained"
            aria-label="outlined button group"
            orientation="vertical"
            >
    <Button
            sx={{ mt: 2, mb: 1,backgroundColor: 'red' }}
            startIcon={<GoogleIcon/>}
            onClick={onGoogleSignIn}
          >           
             Continue with Google
          </Button>
          <Button
            startIcon={<FacebookIcon/>}
            onClick={onFacebookSignIn}
          >           
             Continue with Facebook
          </Button>
          </ButtonGroup>
    </Box>
      </Container>
    </Container>
  );
}
