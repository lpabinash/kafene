import React from "react";
import "./orders.css";
const axios = require('axios');

class OrderDetails extends React.Component {
 
    state = {
        searchLists: [],
        id: "",
        customerName: "",
        orderDate: "",
        orderTime: "",
        amount: "",
        orderStatus: "",
    }

    componentDidMount(){
        let arr= [];
        axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders/${this.props.data}`)
      .then( (response)=> {
              this.setState({
                id: response.data.id,
                customerName: response.data.customerName,
                orderDate: response.data.orderDate,
                orderTime: response.data.orderTime,
                amount: response.data.amount,
                orderStatus: response.data.orderStatus,
              })
      })
      }


    render() {
        return(
            <table style={{margin: "200px auto" }} class="orderList-table">
                <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Order Date</th>
                    <th>Order Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr> 

                <tr  onClick={this.onItemClicked} class="userList-tableRow">
                 <td style={{padding:"25px 25px"}} class="userList-secondaryText"> {this.state.id}</td>
                 <td  class="userList-primaryText"> {this.state.customerName}</td>
                 <td  class="userList-secondaryText"> {this.state.orderDate}</td>
                 <td  class="userList-secondaryText"> {this.state.orderTime}</td>
                 <td  class="userList-secondaryText"> {this.state.amount}</td>
                 <td  class="userList-primaryText">{this.state.orderStatus}</td>
                </tr>
            </table>
        );
    }
}
export default OrderDetails;