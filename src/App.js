import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import Form from "./components/form";
import Movie from "./components/movies";
import Homepage from "./components/home";
import Booking from "./components/booking";
import Register from "./components/register"
import Payment from "./components/payment"
import PayPayment from "./components/pay"
import paymentConfirmed from "./components/paymentConfirmed"
import Deleted from "./components/deleted"
import ShowMovies from "./components/showMovies"
import EditMovies from "./components/editMovies"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/form" component={Form}/>
        <Route exact path="/addmovie" component={Movie}/>
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/booking" component={Booking} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/pay-payment" component={PayPayment} />
        <Route exact path="/payment-confirmed" component={paymentConfirmed} />
        <Route exact path="/deleted" component={Deleted} />
        <Route exact path="/showmovies" component={ShowMovies} />
        <Route exact path="/edit-movies" component={EditMovies} />
      </Switch>
    </Router>
  );
}

export default App;
