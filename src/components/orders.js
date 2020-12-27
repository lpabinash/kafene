import React from "react";
import "./orders.css";
import { Link } from 'react-router-dom';
const axios = require('axios');

class Orders extends React.Component {
 
    state = {
      filterList: [
        {
          id: 11,
          name: "New",
          value: "New"
        },
        {
          id: 12,
          name: "Packed",
          value: "Packed"
        },
        {
          id: 13,
          name: "InTransit",
          value: "InTransit"
        },
        {
          id: 14,
          name: "Delivered",
          value: "Delivered"
        }
      ],
      searchLists: [],
      activeFilter: [],
      filteredList:[]
    };


  componentDidMount(){
    axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
  .then( (response)=> {
    this.setState({searchLists:[...response.data]});
  })
  }

  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({ activeFilter: filterList.map(filter => filter.value) });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
  }

  onItemClicked = (e) => {
    this.props.orderData(e.target.getAttribute('data-key'));
  }

  render() {
    let filteredList=[];
    if (
        this.state.activeFilter.length === 0 ||
        this.state.activeFilter.length === this.state.filterList.length
    ) {
        
      filteredList = this.state.searchLists;
    } else {
        console.log(this.state.activeFilter)
        console.log(this.state.searchLists)
      filteredList = this.state.searchLists.filter(item =>
        this.state.activeFilter.includes(item.orderStatus)
      );
    }
    return (
        <div>
        
      <div class="userList-pageWrapper">
      <h1 style={{width:"100%",textAlign:"left", marginBottom:"50px"}}>Orders</h1>
      <div class="subWrapper">
          <div class="filters">
              
              <h2 style={{textAlign:"left"}}>Filters</h2>
              <p  style={{textAlign:"left"}}>Count: {filteredList.length}</p>
        <form  style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <label style={{display:"none"}} htmlFor="myInput">All</label>
          <input style={{display:"none"}}
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            checked={this.state.activeFilter.length === this.state.filterList.length || this.state.activeFilter.length===0}
          />
          {this.state.filterList.map(filter => (
            <React.Fragment>
                <div class="filter">
              
              <input
                id={filter.id}
                type="checkbox"
                checked={this.state.activeFilter.includes(filter.value)}
                onClick={() => this.onFilterChange(filter.value)}
              />
              <label htmlFor={filter.id}>{filter.name}</label>
              </div>
            </React.Fragment>
          ))}
        </form>
        </div>
        <div>
        <table class="orderList-table">
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>       
    {
          filteredList.map(item => {
            return( 
                <tr data-key={item.id} onClick={this.onItemClicked} class="userList-tableRow">
                 <Link to="/orderdetails"> <td data-key={item.id} style={{textDecoration:"none!important", paddingTop:"33px"}} class="userList-secondaryText"> {item.id}</td></Link>
                 <td data-key={item.id} class="userList-primaryText"> {item.customerName}</td>
                 <td data-key={item.id}> <p style={{marginBottom:"0px", paddingTop:"17px"}} class="userList-primaryText">{item.orderDate}</p><p style={{marginTop:"5px"}} class="userList-secondaryText">{item.orderTime}</p></td>
                 <td data-key={item.id} class="userList-secondaryText"> {item.amount}</td>
                 <td data-key={item.id} class="userList-primaryText">{item.orderStatus}</td>
                </tr>
              )
          }
          )
          }
          </table>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Orders;