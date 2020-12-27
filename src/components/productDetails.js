import React from "react";
import "./orders.css";
const axios = require('axios');

class ProductDetails extends React.Component {
 
    state = {
        searchLists: [],
        id: "",
        medicineName: "",
        medicineBrand: "",
        expiryDate: "",
        unitPrice: "",
        stock: "",
    }

    componentDidMount(){
        axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/${this.props.data}`)
      .then( (response)=> {
        console.log(response.data.id)
              this.setState({
                id: response.data.id,
                medicineName: response.data.medicineName,
                medicineBrand: response.data.medicineBrand,
                expiryDate: response.data.expiryDate,
                unitPrice: response.data.unitPrice,
                stock: response.data.stock,
              })
      })
      }


    render() {
        return(
            <table style={{margin: "200px auto" }} class="orderList-table">
                <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th style={{width:"170px"}}>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
                </tr> 

                <tr class="userList-tableRow">
                 <td style={{padding:"25px 25px"}} class="userList-secondaryText"> {this.state.id}</td>
                 <td class="userList-primaryText"> {this.state.medicineName}</td>
                 <td class="userList-secondaryText">{this.state.medicineBrand}</td>
                 <td class="userList-primaryText"> {this.state.expiryDate}</td>
                 <td class="userList-secondaryText">{this.state.unitPrice}</td>
                 <td class="userList-secondaryText">{this.state.stock}</td>
                </tr>
            </table>
        );
    }
}
export default ProductDetails;