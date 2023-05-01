import { Container ,Typography,makeStyles, Grid } from '@material-ui/core'
import React ,{useEffect} from 'react'
import ProductCard from '../utils/cards/ProductCard'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {searchProductDataByName } from '../../slices/productSlice'
const useStyles = makeStyles({
heading: {
        textAlign: 'center',
        margin: '20px auto',
        fontWeight: 'bold',
        color: 'gray'
    }
})

function Search() {
     const products =  useSelector(state=>state.product);
     const dispatch = useDispatch();
      let { name } = useParams();

     const classes = useStyles();
     useEffect(() => {
        dispatch(searchProductDataByName(name))
    }, [name])
    return (

        <Container>
         <Typography  variant='h5' className={classes.heading}>Search results</Typography>
          <Grid container spacing={4} direction='row' justify='space-evenly'>
     
                {
                    products.status === 'pending' ? (<p>loading...</p>) :
                        products.error ? (<p>{products.error}</p>) :
                             ( products.data && products.data.length == 0 )? (<p>No products found</p>):
                              products.data.map((product) => (<Grid item lg={4}><ProductCard  data={product} /></Grid>))
                }
   
            </Grid>
        </Container>
    )
}

export default Search
