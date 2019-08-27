import React, { Component } from "react";
//import Order from "./components/order";
//import Orders from "./components/orders";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Movie from "./components/movie";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logOut";
import RegisterForm from "./components/registerForm";
import { getUser } from "./services/authService";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {
    orders: [{ id: 1, count: 2 }, { id: 2, count: 0 }, { id: 3, count: 5 }],
    user: {}
  };

  componentDidMount() {
    const user = getUser();
    this.setState({ user }, () => {});
  }

  handleDelete = id => {
    const orders = this.state.orders.filter(orders => orders.id !== id);
    this.setState({ orders: orders });
  };

  handleResetOrders = () => {
    const orders = this.state.orders.map(order => {
      order.count = 0;
      return order;
    });
    this.setState({ orders });
  };

  handleIncrement = order => {
    const orders = [...this.state.orders];
    const index = orders.indexOf(order);
    // orders[index] = { ...order };
    orders[index].count++;
    this.setState({ orders });
  };

  handleDecrement = order => {
    if (order.count > 0) {
      const orders = [...this.state.orders];
      const index = orders.indexOf(order);
      // orders[index] = { ...order };
      orders[index].count--;
      this.setState({ orders });
    }
  };
  render() {
    return (
      <React.Fragment>
        {/*    <NavBar orders={this.state.orders}> </NavBar>
        <main className="container">
          <Orders
            orders={this.state.orders}
            onResetOrders={this.handleResetOrders}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main> */}

        <NavBar user={this.state.user}> </NavBar>

        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/register" component={RegisterForm} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={props => <Movie {...props} user={this.state.user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route
            exact
            path="/"
            render={props => <Movie {...props} user={this.state.user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
