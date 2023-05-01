import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    container: {
        marginTop: '3vh'
    },
    root: {
        maxWidth: 250,
        textAlign: 'center'
    },
    media: {
        height: 200,
        backgroundSize: "100% 100%"
    },
    textArea: {
        height: 70,

    },
    heading: {
        textAlign: 'center',
        margin: '20px auto',
        fontWeight: 'bold',
        color: 'gray'
    },
    text: {
        fontWeight: 'bold'
    }

});


export default function MediaCard({ data }) {
    const history = useHistory()
    const classes = useStyles();
    function clickHandler(_id) {
        console.log(_id, 'clicked')
        history.push(`/product/${_id}`)
    }
    return (


        <Card className={classes.root} onClick={() => { clickHandler(data._id) }}  >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={data.image}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.textArea}>
                    <Typography className={classes.text} variant='subtitle1' >{data.name} </Typography>
                    <Typography variant="subtitle1" > Rs.{data.price} </Typography>
                </CardContent>
            </CardActionArea>

        </Card>

    );
}
