import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm";
import RegisterForm from "./components/RegisterForm";
import auth from "./services/authService";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartState";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log("user", user);
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <CartProvider>
        <BrowserRouter>
          <ToastContainer />
          <NavBar user={user} />
          <main className="container">
            <Switch>
              <Route
                path="/products"
                render={(props) => {
                  if (!user)
                    return (
                      <Redirect
                        to={{
                          pathname: "/login",
                          state: { from: props.location },
                        }}
                      />
                    );
                  return <Products {...props} user={this.state.user} />;
                }}
              />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/home" component={Home} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/addProduct" component={ProductForm} />
              <Route path="/cart" component={Cart} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
            </Switch>
          </main>
        </BrowserRouter>
      </CartProvider>
    );
  }
}

export default App;
