import React from 'react';
import './users.css';
import Axios from 'axios';
class Users extends React.Component {
    state={
        users: [],
        usersData: [],
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        var searchedName = e.target.search.value;
        console.log(searchedName);
        if(searchedName.length < 2) {
            alert("Please enter at least 2 characters");
        }
        else {
            // mainDiv.innerHTML = "";
            const filteredData = this.state.usersData.filter(searched=>searched.fullName.toLowerCase().includes(searchedName.toLowerCase()))
            console.log(filteredData);
            this.setState({users: []});
            this.setState({users: filteredData});
        }
    }

    onReset = () => {
        // mainDiv.innerHTML = "";
        console.log(this.state.usersData);
        this.setState({users: []});
        this.setState({users: this.state.usersData});
    }

    componentDidMount() {
        Axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then((response) => {
            this.setState({users:[...response.data], usersData:[...response.data]})
        })
        .catch((error) => {
            console.log('Failed =>', error);
        })
    }

    render() {
        return(
            <div class="userList-pageWrapper">
                <h1 class="userList-mainHeading">Users</h1>
                <div class="userList-Wrapper">
                    <form onSubmit={this.onFormSubmit} id="myForm" class="userList-filterWrapper">
                        <input id="myInput" class="userList-searchBox" type="search" name="search" placeholder="Search by Name" />
                        <input onClick={this.onReset} id="resetButton" class="userList-button" type="reset" value="Reset" />
                    </form>
                    <div style= {{width: "100%"}}>
                        <table class="userList-table">
                            <tr>
                                <th>ID</th>
                                <th>User Avatar</th>
                                <th>Full Name</th>
                                <th style={{minWidth: "100px"}}>DOB</th>
                                <th>Gender</th>
                                <th>Current Location</th>
                            </tr>
                            <tbody id="users-tbody">
                                { 
                                    this.state.users.map(item => {
                                        return (
                                            <tr  key={item.id} class="userList-tableRow">
                                                <td class="userList-secondaryText">{item.id}</td>
                                                <td class="userList-primaryText"><img src={item.profilePic} alt="profile pic"/></td>
                                                <td class="userList-secondaryText">{item.fullName}</td>
                                                <td class="userList-primaryText">{item.dob}</td>
                                                <td class="userList-secondaryText">{item.gender}</td>
                                                <td class="userList-secondaryText">{item.currentCity + "," + item.currentCountry}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default Users;