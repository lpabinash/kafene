import React from 'react';
import logo from './logo.svg';
import './App.css';
import Topbar from "./components/topbar";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Orders from "./components/orders";
import Products from "./components/products";
import Users from "./components/users";
import Login from "./components/login";
import OrderDetails from "./components/orderDetails";
import ProductDetails from "./components/productDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data: "asd",
      loginStatus: localStorage.getItem("loginStatus"),
      orderColor: "#20b883",
      orderBorderBottom: "3px solid #20b883",
      orderData: [],
      productData: [],
    };
  }

  fetchingLoginStatus = (loginData) => {
    this.setState({
      loginStatus: loginData,
      orderColor: "#20b883",
      orderBorderBottom: "3px solid #20b883",

    })
  }
  fetchingLoginStatusFromTopbar = (loginData) => {
    this.setState({
      loginStatus: loginData,
      orderColor: "rgba(0,0,0,.8)",
      orderBorderBottom: "none",
    })
  }
  fetchingorderData = (childData) => {
    this.setState({
      orderData: childData,
    })
  }
  fetchingproductData = (childData) => {
    this.setState({
      productData: childData,
    })
  }

  render() {
    return (
      <BrowserRouter>
      {
        (this.state.loginStatus == false || this.state.loginStatus == "false" || this.state.loginStatus == null || this.state.loginStatus == undefined) ? <Redirect to="/login" /> : <Redirect to="/orders" />
      }
        <div>
          {/* {
            (this.state.loginStatus == true || this.state.loginStatus == "true") ? 
            <Topbar loginStatus={this.state.loginStatus} color={this.state.orderColor} borderBottom={this.state.orderBorderBottom} loginStatusFromTopbar={this.fetchingLoginStatusFromTopbar} />
            :
            <Topbar loginStatus={this.state.loginStatus} color="rgba(0,0,0,.8)" borderBottom="none" loginStatusFromTopbar={this.fetchingLoginStatusFromTopbar} />
          } */}
          <Topbar loginStatus={this.state.loginStatus} color={this.state.orderColor} borderBottom={this.state.orderBorderBottom} loginStatusFromTopbar={this.fetchingLoginStatusFromTopbar} />
          <Switch>
            <Route path={"/orders"} render={()=> <Orders orderData={this.fetchingorderData}/>}/>
            <Route path={"/products"} render={()=> <Products productData={this.fetchingproductData}/>}/>
            <Route path={"/users"} component={Users}/>
            <Route path={"/login"} render={()=> <Login loginStatus={this.fetchingLoginStatus}/>}/>
            <Route path={"/orderdetails"} render={()=> <OrderDetails data={this.state.orderData}/>}/>
            <Route path={"/productdetails"} render={()=> <ProductDetails data={this.state.productData}/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
