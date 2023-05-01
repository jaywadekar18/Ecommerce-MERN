import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser ,getMyData } from '../../../slices/usersSlice'
import {useHistory} from 'react-router-dom'
import {Link  } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUp:{
        margin:'10px auto'
    }
}));

function LoginForm() {
    const history = useHistory()
    const dispatch = useDispatch();
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
   async function onSubmit(data) {
       console.log(data)
       await  dispatch(loginUser(data));
       await dispatch(getMyData());
       if(localStorage.user){
                history.push('/home')
       }
      
    }

    return (

        <Container component="main" maxWidth="xs">
           
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                 </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"

                        inputRef={register({
                            required: true,
                            minLength: 6,
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email && (errors.email.type === 'required' && "Email is required*")
                            || errors.email && (errors.email.type === 'minLength' && "Mininum length is 6")}
                        fullWidth
                        label="Email Address*"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        
                        fullWidth
                        name="password"
                        label="Password*"
                        type="password"
                        inputRef={register({
                            required: true,
                            minLength: 8
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password && (errors.password.type === 'required' && "Password is required*")
                            || errors.password && (errors.password.type === 'minLength' && "Mininum length is 8")}
                        autoComplete="current-password"
                    />

    
                     
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
          </Button>

                </form>
            </div>
            <Link to= '/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button className={classes.signUp} color="primary">Don't have account?..Sign up Now</Button>
            </Link>
           
        </Container>


    );
}

export default LoginForm;