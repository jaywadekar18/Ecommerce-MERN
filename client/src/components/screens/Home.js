import React from 'react'
import ItemCards from '../utils/cards/HomeCard'
import { makeStyles, Container, Typography } from '@material-ui/core';
import cardData from '../static/homeCardData'
import Corousel from '../utils/carousel/Carousel'
const useStyles = makeStyles((theme) => ({
    container: {
        // background: "rgb(36,13,0)",
        //background: "radial-gradient(circle, rgba(36,13,0,1) 0%, rgba(255,191,123,1) 0%, rgba(121,33,9,1) 100%)",
        minHeight: '100vh',
        //clipPath: "polygon(0 0, 100% 0, 100% 26%, 0 63%)",
        // backgroundImage: `url(https://picsum.photos/1100/1200)`
        background: "rgb(240,144,31)",
        background: "linear-gradient(90deg, rgba(240,144,31,1) 0%, rgba(255,136,0,1) 0%, rgba(254,252,252,1) 100%)"
    },
    heading: {
        textAlign: 'center',
        padding: '2vh',
        fontWeight: 'bold',
        color: 'gray'
    },

}));
function Home() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Container >
                <Corousel />
                <Typography className={classes.heading} variant='h5'>Categories</Typography>
                <ItemCards categories={cardData} />

            </Container>
        </div>
    )
}

export default Home
