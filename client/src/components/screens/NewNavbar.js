import React from 'react'
import { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from 'react-router-dom'
import teal from '@material-ui/core/colors/teal';
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../slices/usersSlice'
//import { searchProductDataByName } from '../../slices/productSlice'
import { searchProductsByName } from '../../slices/searchProductSlice';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: teal[700]
    },
    title: {
        fontFamily: 'Lobster, cursive',
        marginRight: '7px'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    flex: {
        display: 'flex',
    },
    suggestionDropdown: {

        maxHeight: '200px',
        overflowY: 'scroll',
        zIndex: 3,
        maxHeight: "200px",
        // overflowY: "scroll",
        position: "absolute",
        top: "60px",
        "@media(max-width: 576px)": {
            top: "100px"
        },
        color: "inherit",
        background: "inherit",
        //borderRadius: "20px",
        width: "100%"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '40%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
        },
    },
    // sectionDesktop: {
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'flex',
    //     },
    // },

}));

function NewNavbar() {
    const cart = useSelector(state => state.cart.data);
    const user = useSelector(state => state.user);

    const history = useHistory()

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };


    const classes = useStyles();

    const [search, setSearch] = useState('')
    const searchResult = useSelector(state => state.search);
    const searchHandler = () => {
        if (search.trim()) {
            history.push(`/search/${search}`)
        }
        // else {
        //     history.push('/');
        // }
    }
    let onFlag = false;
    const instantSearch = (search) => {

        setSearch(search);
        if (search != '' && search.length > 0) {
            if (onFlag) return;
            onFlag = true
            setTimeout(() => {
                dispatch(searchProductsByName(search));
                onFlag = false
            }, 300);

        }

    }
    useEffect(() => {

        if (searchResult.data.length > 0 && search != '') {
            setOpen(true);

        } else {
            setOpen(false);

        }
    }, [searchResult])



    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>


                        <Typography className={classes.title} variant="h6" noWrap>
                            Jay's Store
                        </Typography>
                    </Link>
                    {window.innerWidth > 576 && <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…" onChange={(e) => { instantSearch(e.target.value) }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}

                        />

                    </div>}

                    {window.innerWidth > 576 &&
                        <Button variant='contained' size='small' style={{ color: 'teal' }} onClick={() => { searchHandler() }} >Search</Button>
                    }
                    <div className={classes.grow} />

                    <Link to='/cart' className={classes.flex} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <IconButton color="inherit">



                            {cart && cart.length !== 0 ?
                                <Badge badgeContent={cart.length} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge> :
                                <Badge badgeContent={0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>

                            }
                        </IconButton>
                    </Link>

                    {
                        localStorage.accessToken && user && user.loggedInUser ?
                            ((user.loggedInUser.role === 'admin') ?
                                <>
                                    <IconButton color="inherit">
                                        <a style={{ textDecoration: "none", color: "inherit" }} href="/admin"><Button  >Admin {user.loggedInUser.name}</Button> </a>
                                    </IconButton>
                                    <IconButton>
                                        <Button onClick={() => { dispatch(logOut()) }}>LogOut </Button>
                                    </IconButton>
                                </>
                                :
                                <div>
                                    <Button onClick={() => { dispatch(logOut()) }} >LogOut</Button>

                                    <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Button>{user.loggedInUser.name}</Button>
                                    </Link>
                                </div>)
                            :
                            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                                <Button style={{ fontWeight: 'bold' }}>login</Button>
                            </Link>



                    }


                </Toolbar>

                {window.innerWidth <= 576 && <div className={classes.search} style={{
                    width: "97%", display: 'flex', margin: '3px auto', margin: '5px auto', justifyContent: 'space-between',
                }}>
                    <div className={classes.searchIcon} >
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…" onChange={(e) => { instantSearch(e.target.value) }}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}

                    />
                    <Button variant='contained' size='small' style={{ color: 'teal' }} onClick={() => { searchHandler() }} >Search</Button>
                </div>}


                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.suggestionDropdown} >
                        {

                            open &&
                            searchResult.data.map((product) =>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem key={product._id} onClick={() => { setOpen((prev) => !prev); console.log('in func call') }} value="fdff">{product.name} </MenuItem>
                                </Link>
                            )
                        }
                    </div>
                </ClickAwayListener>
            </AppBar>

        </>
    )
}

export default NewNavbar