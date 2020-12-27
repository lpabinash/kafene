import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            username:"",
            password:"",
            route:"/login",
            data: this.props.data,
        };
    }

    onFormSubit = (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        if(username == null || username == null) {
            username = "";
        }
        if(password == null || password == null) {
            password = "";
        }
        console.log(username);
        console.log(password);
        this.setState({
            username: username,
            password: password,
        })
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        console.log(username);
        this.setState({
            username: username,
        })
    }
    onPasswordChange = (e) => {
        let password = e.target.value;
        console.log(password);
        this.setState({
            password: password,
        })
    }

    onButtonClicked = () => {
        let username = this.state.username;
        let password = this.state.password;

        if(username == password && (username !== "" || password !== "")) {
            console.log("same");
            
            this.setState({route:"/orders"});
            alert("Login Successful");

            
            this.props.loginStatus(true);
            localStorage.setItem("loginStatus", true);
            
            Axios.post('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login', {
                username: this.state.username,
                password: this.state.password,
            })
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else {
            this.props.loginStatus(false);
            localStorage.setItem("loginStatus", false);
            alert("Wrong username or password");
        }
    }

    render() {
        return(
            <div class="container">
                <div style={{display:"flex", justifyContent:"center", height:"100%"}}>
                    <div class="card">
                        <div class="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.onFormSubit}>
                                <div class="input-group">
                                    <div style={{display:"flex", marginRight:"-3px"}}>
                                        <span class="input-group-span"></span>
                                    </div>
                                    <input onChange={this.onUsernameChange} type="text" id="username" class="form-control" name="username" placeholder="username" />
                                </div>
                                <div class="input-group">
                                    <div style={{display:"flex", marginRight:"-3px"}}>
                                        <span class="input-group-span"></span>
                                    </div>
                                    <input onChange={this.onPasswordChange} type="password" id="password" class="form-control" name="password" placeholder="password" />
                                </div>
                                <div style={{alignItems:"center!important", display: "flex", flexWrap:"wrap", marginRight:"-15px", marginLeft:"0px", color:"white", alignItems:"center"}}>
                                    <input style={{boxSizing:"border-box", padding:"0", width: "20px", height:"20px", marginLeft:"15px", marginRight:"5px", overflow: "visible", margin: "0"}} type="checkbox" />
                                    <div style={{marginLeft:"10px"}}>Remember Me</div>
                                </div>
                                <div onClick={this.onButtonClicked} class="form-group">
                                    <Link to={this.state.route}><input type="submit" id="submit" value="submit" value="Login" class="btn" /></Link>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div style={{display:"flex", justifyContent:"center!important", color:"white"}}>
                            Don't have an account?
                            <a style={{marginLeft: "4px", color:"#007bff", textDecoration:"none", backgroundColor:"transparent"}} href="#">Sign Up</a>
                            </div>
                            <div style={{display:"flex", justifyContent:"center!important"}}>
                            <a style={{color:"#007bff", textDecoration:"none", backgroundColor:"transparent"}} href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;