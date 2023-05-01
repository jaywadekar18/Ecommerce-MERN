import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Cart from '../src/components/screens/Cart'
import Home from '../src/components/screens/Home'
import Login from '../src/components/screens/Login'
import SignUp from '../src/components/screens/SignUp'
import Navbar from './components/screens/Navbar'
import NewNavbar from './components/screens/NewNavbar'
import Product from '../src/components/screens/Product'
import Products from '../src/components/screens/Products'
import Admin from '../src/components/screens/Admin'
import Delivery from '../src/components/screens/Delivery'
import PrivateRoute from '../src/components/utils/route/PrivateRoute'
import Profile from '../src/components/screens/Profile'
import Search from '../src/components/screens/Search'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
toast.configure()
function App() {
  return (
    <div >

      <Router>
        <NewNavbar />
        <Switch>

          <Route exact path='/' component={Home} />
          <Route path='/cart' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/home' component={Home} />
          <Route path='/product/:id' component={Product} key={Math.random} />
          <Route path='/products/:category' component={Products} />
          <Route path='/delivery' component={Delivery} />
          <PrivateRoute path='/profile' component={Profile} />
          <Route path='/search/:name' component={Search} />
          <PrivateRoute exact path='/admin' component={Admin} />

          
        </Switch>
       
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
