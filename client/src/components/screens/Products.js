import React, { useEffect } from 'react'
import CardComp from '../utils/cards/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getProductData, getProductsDataByCategory } from '../../slices/productSlice'
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { useParams } from "react-router-dom";
const useStyles = makeStyles({
    container: {

    },
    heading: {
        textAlign: 'center',
        margin: '20px auto',
        fontWeight: 'bold',
        color: 'gray'
    }

});

function Products() {

    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    let { category } = useParams();
    useEffect(() => {
        console.log("catgory");
        console.log(category);
        dispatch(getProductsDataByCategory(category));

    }, [])

    const classes = useStyles();
    return (

        <Container className={classes.container}>
            <Typography variant='h5' className={classes.heading}>{category}</Typography>
            <Grid container spacing={4} direction='row' justify='space-evenly'>
                {
                    products.status === 'pending' ? (<p>loading...</p>) :
                        products.error ? (<p>{products.error}</p>) :
                            (products.data && products.data.length == 0) ? (<p>No products found</p>) :
                                products.data.map((product) => (<Grid item lg={4}><CardComp data={product} /></Grid>))
                }
            </Grid>




        </Container>
    )
}

export default Products
