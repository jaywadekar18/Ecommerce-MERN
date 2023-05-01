import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

//import playstation from './playstation.jpg'
import iphone from './iphone4.png'
import canon2 from './canon3.jpg'
import playStation from './playStation3.jpg'
import { TextField, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

    corousel: {
        margin: '0px auto'
    },
    img: {
        height: '500px',
        width: '800px'
    },
    "@media(max-width: 1250px)": {
        img: {
            height: "400px"
        },
    },
    "@media(max-width: 800px)": {
        img: {
            height: "350px"
        },
    },
    "@media(max-width: 700px)": {
        img: {
            height: "300px"
        },
    },
    "@media(max-width: 400px)": {
        img: {
            height: "200px"
        },
    },

}));


export default function CarouselComp() {
    const classes = useStyles();
    return (
        <div>
            <Carousel className={classes.corousel} infiniteLoop useKeyboardArrows autoPlay showThumbs={false} >
                <div>
                    <img className={classes.img} src={iphone} />
                    <p className="legend">Iphone 12 Pro max</p>
                </div>
                <div>
                    <img className={classes.img} src={canon2} />
                    <p className="legend"> Canon EOS D80 DSLR</p>
                </div>
                <div>
                    <img className={classes.img} src={playStation} />
                    <p className="legend"> PlayStation 4 Pro</p>
                </div>

            </Carousel>
        </div>
    );

}