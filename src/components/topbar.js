import React from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
class Topbar extends React.Component {
    constructor(props) {
        super(props);
    
    this.state={
        orderColor: "#20b883",
        orderBorderBottom: "3px solid #20b883",
        productColor: "rgba(0,0,0,.8)",
        productBorderBottom: "none",
        userColor: "rgba(0,0,0,.8)",
        userBorderBottom: "none",
    };
}

    onOrdersClicked = () => {
        this.setState({
            orderColor: "#20b883",
            orderBorderBottom: "3px solid #20b883",
            productColor: "rgba(0,0,0,.8)",
            productBorderBottom: "none",
            userColor: "rgba(0,0,0,.8)",
            userBorderBottom: "none",
        })
    }
    onProductsClicked = () => {
        this.setState({
            orderColor: "rgba(0,0,0,.8)",
            orderBorderBottom: "none",
            productColor: "#20b883",
            productBorderBottom: "3px solid #20b883",
            userColor: "rgba(0,0,0,.8)",
            userBorderBottom: "none",
        })
    }
    onUsersClicked = () => {
        this.setState({
            orderColor: "rgba(0,0,0,.8)",
            orderBorderBottom: "none",
            productColor: "rgba(0,0,0,.8)",
            productBorderBottom: "none",
            userColor: "#20b883",
            userBorderBottom: "3px solid  #20b883",
        })
    }

    onlogoutClicked = () => {
        this.props.loginStatusFromTopbar(false);
        localStorage.setItem("loginStatus", false);
        this.setState({
            orderColor: "rgba(0,0,0,.8)",
            orderBorderBottom: "none",
            productColor: "rgba(0,0,0,.8)",
            productBorderBottom: "none",
            userColor: "rgba(0,0,0,.8)",
            userBorderBottom: "none",
        })
    }

    render() {
        return(
            <div class="topbar">
                <div class="topbar-leftmenu">
                    <div class="topbar-logoWrapper">
                        <img src="https://cdn.knoji.com/images/logo/kafene.jpg?aspect=center&snap=false" alt="Logo" />
                        <p class="topbar-Brandname">Kafene</p>
                    </div>
                        {
                            this.props.loginStatus == false ? 
                            <nav>
                                <div style={{color: this.state.orderColor, borderBottom: this.state.orderBorderBottom, cursor:"not-allowed"}} id="ordersPage" class="topbar-menuItem" href="orders.html">Orders</div>
                                <div style={{color: this.state.productColor, borderBottom: this.state.productBorderBottom, cursor:"not-allowed"}} id="productsPage" class="topbar-menuItem" href="products.html">Products</div>
                                <div style={{color: this.state.userColor, borderBottom: this.state.userBorderBottom, cursor:"not-allowed"}} id="usersPage" class="topbar-menuItem" href="users.html">Users</div>
                            </nav>
                            :
                            <nav>
                                <Link to="orders" onClick={this.onOrdersClicked} style={{color: this.state.orderColor, borderBottom: this.state.orderBorderBottom}} id="ordersPage" class="topbar-menuItem" href="orders.html">Orders</Link>
                                <Link to="products" onClick={this.onProductsClicked} style={{color: this.state.productColor, borderBottom: this.state.productBorderBottom}} id="productsPage" class="topbar-menuItem" href="products.html">Products</Link>
                                <Link to="users" onClick={this.onUsersClicked} style={{color: this.state.userColor, borderBottom: this.state.userBorderBottom}} id="usersPage" class="topbar-menuItem" href="users.html">Users</Link>
                            </nav>
                        }
                    </div>
                    {
                        (this.props.loginStatus == true || this.props.loginStatus == "true") ? <Link to="login" onClick={this.onlogoutClicked} class="topbar-menuItem" href="index.html">Logout</Link> : null
                    }
            </div>
        );
    }
}
export default Topbar;