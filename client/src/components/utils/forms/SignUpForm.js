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
import { useDispatch } from 'react-redux'
import {  postUserData } from '../../../slices/usersSlice'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
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
}));

function SignUpForm() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    function onSubmit(data) {

        const { confirm_password, ...newData } = data;
      
        dispatch(postUserData(newData));
        
    }
    return (

        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                 </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                        variant="outlined"
                        margin="normal"

                        inputRef={register({
                            required: true,
                            minLength: 6,
                        })}

                        error={Boolean(errors.name)}
                        helperText={errors.name && (errors.name.type === 'required' && "name is required*")
                            || errors.name && (errors.name.type === 'minLength' && "Mininum length is 6")}
                        fullWidth

                        label="Name*"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                       

                        fullWidth
                        name="confirm_password"
                        label="Confirm Password*"
                        type="password"
                        inputRef={register({
                            required: true,
                            validate: ((value) => (value === getValues('password')))
                        })}
                        error={Boolean(errors.confirm_password)}
                        helperText={errors.confirm_password && (errors.confirm_password.type === 'required' && "Confirm Password *")
                            || errors.confirm_password && (errors.confirm_password.type === 'validate' && "Passwords are not matching")}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>

                </form>
            </div>
        </Container>


    );
}

export default SignUpForm;