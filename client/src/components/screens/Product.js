import { Button, Container, Grid, Typography, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getProductDataById } from '../../slices/productSlice'
import { postCartData } from '../../slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReviewSection from '../utils/review-section/ReviewSection';
const useStyles = makeStyles((theme) => ({
    paper: {
        //height: '85vh',
        margin: '20px 0px',
        padding: '15px 15px',
    },
    grid: {
        //margin: '15px 15px',
        padding: '15px 15px'
    },
    name: {
        fontSize: '2rem',
        margin: '20px auto'
    },
    price: {
        fontSize: '1.8rem',
        margin: '20px auto'
    },
    brand: {
        fontSize: '2rem',
        margin: '20px auto'
    },
    description: {
        fontSize: '1rem'
    },
    img: {
        width: '100%',
        height: "100%",
        //margin: '5px 10px'
    },
    addToCartButton: {

    },
    textDiv: {
        margin: '2vh 3vh'
    },
    imgContainer: {
        maxHeight: "350px",
        maxWidth: "350px"
    },
    "@media(max-width: 1000px)": {
        imgContainer: {
            maxHeight: "220px",
            maxWidth: "220px"
        },
        grid: {
            //margin: '15px 15px',
            padding: '5px 5px'
        },
        // paper: {
        //     //height: '85vh',
        //    // margin:'2vh 0px',
        //     padding: '5px 5px',
        // },
        img: {
            //width: "300px",

        },
        name: {
            fontSize: '1.5rem',
            margin: '5px auto'
        },
        price: {
            fontSize: '1.2rem',
            margin: '5px auto'
        },
        brand: {
            fontSize: '1.5rem',
            margin: '5px auto'
        },
        description: {
            fontSize: '.7rem'
        },
        paper: {
            overflow: 'hidden',
            padding: '5px 5px',
        }


    },

}));

function Product() {
    const history = useHistory()
    let { id } = useParams()
    const dispatch = useDispatch();
    const item = useSelector(state => state.product);


    useEffect(() => {
        dispatch(getProductDataById(id))
    }, [])

    function clickHandler(data) {
        const newData = { ...data, quantity: 1 };


        dispatch(postCartData(newData))

    }
    const classes = useStyles();
    return (
        <Container  >
            {
                item && item.status === 'pending' ? (<p>loading...</p>) :
                    item.error ? (<p>{item.error}</p>) :
                        item.data && item.data.length != 0 &&


                        <Paper className={classes.paper} elevation={3} >
                            <Grid container justify="space-evenly" spacing={2} className={classes.grid} >
                                <Grid item lg={5} md={5} className={classes.imgContainer} >
                                    <img className={classes.img} src={item.data[0].image} />
                                </Grid>
                                <Grid item lg={7} md={5}>
                                    <div className={classes.textDiv}>
                                        <Typography className={classes.name}>{item.data[0].name}</Typography>
                                        <Typography className={classes.brand}>{item.data[0].brand}</Typography>
                                        <Typography className={classes.description}>{item.data[0].description}</Typography>
                                        <Typography className={classes.rating}>Rating {item.data[0].rating}</Typography>
                                        <Typography className={classes.price}>Rs.{item.data[0].price}</Typography>
                                        {
                                            (Number(item.data[0].countInStock) > 0) ? <Button className={classes.addToCartButton} endIcon={<ShoppingCartIcon />} variant='contained'
                                                onClick={() => { clickHandler(item.data[0]) }}>Add to cart </Button>
                                                :
                                                <Button disabled={true} className={classes.addToCartButton} endIcon={<ShoppingCartIcon />} variant='contained'> Not available</Button>

                                        }
                                        <br />
                                    </div>
                                </Grid>
                            </Grid>
                            {/* <ReviewSection /> */}
                        </Paper>
            }

        </Container>
    )
}

export default Product
