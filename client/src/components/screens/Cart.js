import React from 'react'
import { deleteCartData, updateCartData } from '../../slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Container, Typography, Grid, Card, makeStyles, Select, MenuItem, Button, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useHistory } from 'react-router-dom';
import {  toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '20px',
        textAlign: 'center'
    },
    buyNowButton: {
        width: '100%',

    },

    priceDiv: {
        height: '30px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'

    },
    price: {
        fontSize: 'large',
        fontWeight: 'bold'
    },
    card: {
        padding: '10px',
        margin: '10px'
    },
    priceCard: {
        padding: '10px auto',
        margin: '10px auto'
    },
    grid: {
        //margin: '5px auto'
    },
    image: {
        // margin: '3px 3px'
        width: "100%",
        height: "100%",
    },
    imgContainer: {
        maxHeight: "100px",
        maxWidth: "100px"
    },
    text: {

        textAlign: 'left',
        // padding: '5px 20px',
        // margin: '5px 20px'
    },
    subTotal: {
        float: 'right',
        fontWeight: 'bold'
    },
    noItemInCart: {

        background: 'lightgray',
        height: '40px'
    },

    "@media(max-width: 1000px)": {
        text: {
            padding: '4px 10px',
            margin: '4px 10px'
        },
        imgContainer: {
            maxHeight: "70px",
            maxWidth: "70px"
        },
        // image: {
        //     // height: '80px',
        //     // width: '80px',
        //     // margin: '3px 3px'
        //     width: "100%",
        //     height: "100%",

        // },
        name: {
            fontSize: '15px'
        },
        price: {
            fontSize: '14px'
        },
        subTotal: {
            float: 'right',
            fontSize: '12px',
            margin: '3px 3px',

        },


    }

}));

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const history = useHistory()

    const notify = (msg) => toast.info(msg);
    function deleteHandler(id) {
        dispatch(deleteCartData(id));

    }
    function buysNowHandler() {
        console.log("outSidebuysHnader")
        if (localStorage.accessToken && localStorage.cartItem && localStorage.user) {
            history.push('/delivery');
            console.log("InDeliveryPush")
        }
        else {
            history.push('/login');
            //alert('You need to login first!!');
            notify('You need to login first!!')
            console.log("InloginPush")
        }
    }

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container direction='row' spacing={3} justify='center'>

                <Grid item lg={8} md={8} sm={8}>

                    <Typography variant='h4'>Cart items</Typography>
                    {cartItems && cartItems.status === 'pending' ? (<p>loading...</p>) :
                        cartItems.error ? (<p>{cartItems.error}</p>) :
                            cartItems.data && cartItems.data.length == 0 ? (<p className={classes.noItemInCart}>No items in cart!!</p>) :


                                cartItems.data.map((cartItem) => (
                                    <Card className={classes.card}  >

                                        <Grid container direction='row' justify='space-evenly' className={classes.grid} >

                                            <Grid item lg={2} md={2} sm={2} className={classes.imgContainer}>

                                                <img src={cartItem.image} className={classes.image} height='100px' width='100px' alt="hhh" />
                                            </Grid>

                                            <Grid className={classes.text} item lg={9} md={9} sm={9} >

                                                <Link to={`/product/${cartItem._id}`} style={{ textDecoration: 'none', color: 'inherit' }}> <Typography className={classes.name} variant='h5'>{cartItem.name} </Typography> </Link>
                                                <Typography className={classes.price} variant='h6'>Rs.{cartItem.price}</Typography>
                                                <Typography className={classes.subTotal} >Subtotal Rs.{cartItem.price * cartItem.quantity}</Typography>



                                                <Select onChange={e => dispatch(updateCartData([cartItem._id, e.target.value]))} defaultValue={cartItem.quantity} style={{ margin: 'auto 10px' }}>
                                                    {[...Array(cartItem.countInStock).keys()].map((x) => (
                                                        <MenuItem key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </MenuItem>
                                                    ))}


                                                </Select>
                                                <Button className={classes.deleteButton} variant='contained' onClick={() => { deleteHandler(cartItem._id) }}><DeleteIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Card>


                                ))}





                </Grid>



                <Grid item lg={4} md={4} sm={4} >
                    <Typography variant='h4'>Total</Typography>
                    <Paper className={classes.priceCard}>
                        <Typography variant='h6'>Grand total</Typography>
                        {
                            cartItems && cartItems.data && <div className={classes.priceDiv}>
                                <Typography className={classes.price} >Rs.{cartItems.data.reduce((acc, item) => (acc + item.price * item.quantity), 0)}</Typography>
                            </div>
                        }

                        <Button onClick={buysNowHandler} disabled={cartItems && cartItems.data && cartItems.data.length > 0 ? false : true}
                            variant='contained' endIcon={<ArrowForwardIcon />} color='primary' className={classes.buyNowButton} >Buy Now</Button>

                    </Paper>
                </Grid>

            </Grid>

            
        </Container>
    )
}

export default Cart
