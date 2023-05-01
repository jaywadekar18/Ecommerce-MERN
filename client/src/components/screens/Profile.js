import { Card, Container, Typography, makeStyles, TextField, Button } from '@material-ui/core'
import React ,{useEffect} from 'react'
import { getMyData ,updateUserData } from '../../slices/usersSlice'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
const useStyles = makeStyles({
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    card: {
        height: '50vh',
        margin: '5vh 5vh',
        padding: '3vh 3vh'
    },
    form: {

        textAlign: 'center'

    }
})
function Profile() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const classes = useStyles()
    function onSubmit(data) {
        const newData ={ ...data , _id :user.data._id, role: 'customer'};
        dispatch(updateUserData(newData));
        
    }
    useEffect(() => {
       dispatch(getMyData());
      
    }, [])
    return (
        <Container>
            <Card className={classes.card}>
                <Typography className={classes.title}>Profile</Typography>
                <div  >
                {
                    user.status === 'pending' ? (<p>loading...</p>) :
                    user.error ? (<p>{user.error}</p>) :
                        user.data &&
               
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={user.data.name}
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <br />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={user.data.email}
                            label="Email"
                            name="email"
                            autoComplete="countInStock"
                            autoFocus
                        />
                        <br />
                        <Button type='submit' variant='contained' color="primary">Update</Button>
                    </form>
                }
                </div>
            </Card>

        </Container>
    )
}

export default Profile
