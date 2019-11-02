import React from 'react';
import Axios from 'axios';

class UserDetails extends React.Component{

    state ={
        sec: '',
        year: '',
        dept : '',
        rollnumber : '',
        contactNumber : ''
    }

    handleChange = (e) =>{

        this.setState({
            [e.target.id]:e.target.value
        })
        //console.log(this.state)
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        Axios({
            method: 'post',
            url: 'http://35.154.246.255:9000/student',
            data: this.state
        })
        .then((res)=>{
            console.log("Success-->"+res);
            alert("User Created Success Fully")
            this.props.changeVisiblity()
        })
        .catch((err)=>{
            console.log("Couldnt save Data")
        })

    }

   
    render(){

        return(
            <div className="conatiner">
                
                    
                <div className="row">
                    <form className="col s12">
                        <div className="row">       
                            <div className="input-field col s6">
                                <input id="rollnumber" type="number" className="validate" onChange={this.handleChange}/>
                                <label for="rollnumber">Roll Number</label> 
                            </div>
                                

                            <div className="input-field col s6">
                                <input  id="year" type="number" className="validate" onChange={this.handleChange}/>
                                <label for="year">Year</label> 
                            </div>
                        </div>
                        <div className="row">    
                            <div className="input-field col s6">
                                <input  id="dept" type="text" className="validate" onChange={this.handleChange}/>
                                <label for="dept">Department</label> 
                            </div>


                            <div className="input-field col s6 ">
                                <input  id="sec" type="text" className="validate" onChange={this.handleChange}/>
                                <label for="sec">Section</label> 
                                <span class="helper-text" data-error="Contact Number must be 10 Digits" data-success=""></span>

                            </div>
                        </div>
                        <div className="row">    

                            <div className="input-field col s6 ">
                                <input  id="contactNumber" type="number" className="validate" max="9999999999" min="1111111111" onChange={this.handleChange}/>
                                <label for="contactNumber">Contact Number</label> 
                                <span class="helper-text" data-error="Contact Number must be 10 Digits" data-success=""></span>


                            </div>

                            <div className="col s2"></div>
                            <button className="btn col s4" onClick={this.handleSubmit}>Submit</button>

                        </div>
                                
                     </form>  
                
                 </div> 

            </div>
        )
    }
}
export default UserDetails;