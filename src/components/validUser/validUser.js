import React from "react";
import axios from 'axios';
import InvalidUser from "../invalidUser/invalidUser";


class ValidUser extends React.Component{

    state={
        postData:''
    }

    componentDidMount(){
        const roll_number = this.props.match.params.roll_number
        console.log('http://35.154.246.255:9000/student/' + roll_number)
        axios.get('http://35.154.246.255:9000/student/' + roll_number)
        .then(res =>{
                console.log(res.data)
                this.setState({
                    postData : res.data
                })
        })
    }

    render(){
        const post = this.state.post ? (
            <div className="conatiner" key={this.state.post.id}>
                <div className="card ">
                    <div className="card-title center"><h3>{this.state.post.title}</h3></div>
                    <div className="card-content"></div>
                    <p>{this.state.post.body}</p>  
                </div>
            </div>
        )
        
        :(
          
            <InvalidUser/>
             ) 
             
             
        return(
            
            <div className="container">
                <h1>Valid User details</h1>
                <div >
                    {post}
                   
                </div>
                
            </div>

        )
    }
}
export default ValidUser;