import React, { useEffect, useState } from 'react';
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
import { searchProductDataByName } from '../../slices/productSlice'

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
    overflowY: 'scroll'
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const cart = useSelector(state => state.cart.data);
  const user = useSelector(state => state.user);

  const history = useHistory()

  const dispatch = useDispatch();


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [search, setSearch] = useState('')
  const products = useSelector(state => state.product);
  const searchHandler = () => {
    if (search.trim()) {
      history.push(`/search/${search}`)
    }
    else {
      history.push('/');
    }
  }
  let onFlag = false;
  const instantSearch = (search) => {

    setSearch(search);
    if (search != '' && search.length > 0) {
      if (onFlag) return;
      onFlag = true
      setTimeout(() => {
        dispatch(searchProductDataByName(search));
        onFlag = false
      }, 3000);

    }

  }

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={() => { history.push('/cart') }} >
        <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton aria-label="show 11 new notifications" color="inherit">

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
        <p>Cart</p>
      </MenuItem>


      {
        localStorage.accessToken && user && user.loggedInUser ?
          ((user.loggedInUser.role === 'admin') ?
            <>
              <MenuItem>

                <a style={{ textDecoration: "none", color: "inherit" }} href="/admin">
                  <Button  >Admin {user.loggedInUser.name}</Button>
                </a>

              </MenuItem>
              <MenuItem>

                <Button onClick={() => { dispatch(logOut()) }}>LogOut </Button>

              </MenuItem>
            </>
            :
            <div>
              <Button onClick={() => { dispatch(logOut()) }} >LogOut</Button>

              <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button>{user.loggedInUser.name}</Button>
              </Link>
            </div>)
          : <MenuItem>
            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit', margin: 'auto' }}>
              <Button>login</Button>
            </Link>


          </MenuItem>

      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar} >
        <Toolbar>
          <Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>


            <Typography className={classes.title} variant="h6" noWrap>
              Jay's Store
            </Typography>
          </Link>
          <div className={classes.search}>
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

          </div>
          <Button variant='contained' size='small' style={{ color: 'teal' }} onClick={() => { searchHandler() }} >Search</Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <div className={classes.suggestionDropdown}>
          {
            products.data.length > 0 && search != '' &&
            products.data.map((product) =>
              <MenuItem value="fdff">{product.name}</MenuItem>
            )
          }
        </div>
      </AppBar>
      {renderMobileMenu}

    </div>
  );
}