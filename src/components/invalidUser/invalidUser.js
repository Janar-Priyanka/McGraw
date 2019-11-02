import React from 'react';
import UserDetails from "./userDetails";


class InvalidUser extends React.Component{

    
   
    

    render(){
        return(
            <div className="conatiner center">
                <h3 className="teal-text ">Create New Student</h3>
               <UserDetails changeVisiblity={this.props.changeVisiblity}/>
            </div>
        )
    }
}

export default InvalidUser;