import React from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';


class auth extends React.Component{

    state ={

        username: null,
        password: null
    }

    handleChange =(e) =>{

        this.setState({
            [e.target.id]:e.target.value
        })

        console.log(this.state.password)
        console.log(this.state.username)
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state.username)
        Axios({
            method: 'post',
            url: 'http://35.154.246.255:9000/login',
            data: this.state
        })
        .then((res)=>{
            console.log("Success-->"+res);
            const cookies = new Cookies();
            cookies.set('user', res.data.token, { path: '/' });
            console.log("Cookies--"+cookies.get('user'));
            this.props.history.push('/')

            
        })
        .catch((err)=>{
            alert("UserName or Password is Invalid")
            console.log("Auth Failed")
        })
    }


    render(){
        return(
        <div className="container center">
                <h1>McGraw Authentication </h1>
                <form onSubmit = {this.handleSubmit}>
                <div className="row">

                        <div className="input-field col s6 ">
                                <input  id="username" type="text" className="validate" onChange={this.handleChange}/>
                        </div>
                </div>

                    <div className="row">
                    <div className="input-field col s6 ">
                                <input  id="password" type="password" className="validate" onChange={this.handleChange}/>
                    </div>

                    </div>

                    <div className="row">
                    <div className="col s2"></div>
                            <button className="btn col s4" >Submit</button>

                    </div>
                </form>
        </div>
        )
    }
}

export default auth;