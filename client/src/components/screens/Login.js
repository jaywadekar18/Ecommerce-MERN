import React from 'react'
import { Container, Card } from '@material-ui/core'
import LoginForm from '../utils/forms/LoginForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        //marginTop: 90
    },
    card: {
        //height: '70vh',
        //width: '60wh',
        //padding: '30px',
        maxWidth: "450px",
    },
    "@media(max-width: 576px)": {
        container: {
            height: 'unset',
            marginTop: 50,
            //display: "unset"
        },
        card: {
            margin: "30px auto"
        }

    }
}));
function Login() {

    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card className={classes.card} elevation={5} >
                <LoginForm />
            </Card>

        </Container>
    )
}

export default Login;
