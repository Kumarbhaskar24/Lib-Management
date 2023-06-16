import {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AtuthContexProvider,useAuth } from "../context/AuthContext";
import { Avatar, Button, Container, TextField, Typography,Box} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

export default function Login(){
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { login, currentUser } = useAuth();

    const navigate = useNavigate();


    async function handleLogin(event)
    {
        event.preventDefault();
        try{
            setLoading(true);
            await login(email,password);
            if (currentUser && currentUser.email === "admin@library.com") {
                console.log("Redirecting to dashboard");
                navigate("/");}
                else{
                    navigate("/");
                }
        }
        catch(err){
            console.log(err);
            setError(true);
        }
        setLoading(false);
    }

    if (currentUser) return <Navigate to="/" />;
    return (
        <Container component="main" maxWidth="sm">
            <Typography varient="h4" mt={4} textAlign="center">
                Library Management System
            </Typography>
            <Container
            maxWidth="xs"
            sx={{marginTop:4, display:"flex",flexDirection:"column",alignItems:"center"}}
            >
                <Avatar
                sx={{m:1,bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5" component="h1">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{mt:1}}>
                <TextField
                    margin="normal"
                    required fullWidth
                    id="email"
                    autoComplete="email"
                    name="email"
                    label="Email Address"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField
                margin="normal"
                required fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <Button 
                disable={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt:3,mb:2}}
                >
                    Login
                </Button>
                {error && (
                    <Typography textAlign="center" color="error" m={2}>
                    Wrong email or password!
                    </Typography>
                )}
                </Box>
                Email Address: <strong>admin@library.com</strong>
                <br />
                <br />
                Password: <strong>admin123</strong>

                <Typography variant="outlined"
                component={Link}
                to="/home"
                sx={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                }}>
                Go to Home{" "}
                <EastIcon sx={{ verticalAlign: "middle", marginLeft: "5px" }} />
                </Typography>
            </Container>

        </Container>
    );
}