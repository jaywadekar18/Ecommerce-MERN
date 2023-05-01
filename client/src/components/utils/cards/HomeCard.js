import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Container, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles({

    root: {
        //width: 160,
        textAlign: 'center',
        width: 160,
        height: 200
    },
    media: {
        height: 150,
        margin: '5px',
        backgroundSize: "100% 100%"
    },
    textArea: {
        height: 50,
        padding: "5px 10px 15px",
    },
    name: {
        fontSize: 15
    },
    // "@media(max-width: 800px)": {
    //     media: {
    //         height: 80
    //     },
    //     root: {
    //         width: 140,
    //         height: 140
    //     },
    //     name: {
    //         fontSize: 16
    //     },

    // },
    "@media(max-width: 500px)": {
        media: {
            height: 100
        },
        root: {
            width: 130,
            height :160
        },
        name: {
            fontSize: 14
        },
        textArea: {
            height:40
        }
    },


});


export default function MediaCard({ categories }) {
    let history = useHistory();
    const classes = useStyles();
    function clickHandler(category) {

        history.push(`/products/${category}`);
    }
    return (


        <Grid container spacing={2} direction='row' justify='space-evenly'>

            {
                categories && categories.map((category) => (<Grid item>

                    <Card className={classes.root} onClick={() => { clickHandler(category.name) }} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={category.imagesLink}

                            />
                            <CardContent className={classes.textArea}>
                                <Typography className={classes.name} gutterBottom variant="h6" >{category.name} </Typography>
                            </CardContent>
                        </CardActionArea>
                        {/* <CardActions  >
                                <Button size="small" color="primary">View products</Button>
                            </CardActions> */}
                    </Card>
                </Grid>))
            }
        </Grid>

    );
}
