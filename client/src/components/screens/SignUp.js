import React from 'react'
import { Typography, Container, Card } from '@material-ui/core'
import SignUpForm from '../utils/forms/SignUpForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',

    },
    card: {
        //height: '70vh',
        maxWidth: "450px",

    },
    "@media(max-width: 576px)": {
        container: {
            height: 'unset',
            marginTop: 50
        },
        card: {
            margin: "30px auto"
        }

    }
}));
function SignUp() {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card className={classes.card} elevation={5}>
                <SignUpForm />
            </Card>
        </Container>
    )
}

export default SignUp
