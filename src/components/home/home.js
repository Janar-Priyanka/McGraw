import React from  'react';
import './home.css';
import InvalidUser from "../invalidUser/invalidUser";
import DisplayStudentDetails from "../displayStudentDetails/displayStudentDetails";
import axios from 'axios';
import { Redirect } from 'react-router'



class Home extends React.Component{

    constructor(){
        super()
        console.log("HomeComponent Initiated")
        this.renderStudentDetails = this.renderStudentDetails.bind(this)

    }
    state ={
        student: {
            id: null,
            rollnumber: null,
            year: null,
            dept: null,
            sec: null,
         },
         STUDENT: [],
         msg: null,
         isHidden : true,
         booksID: [],
         books: []

    }

    changeVisiblity =() => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    
    handleChange = (e) =>{
        if(e.target.value===""){
            this.setState({
                msg: ""
            })
            let prevState = this.state.student
                    prevState.id = null
                    prevState.rollnumber = null
                    prevState.year = null
                    prevState.dept = null
                    prevState.sec = null
                    this.setState({usersColors: prevState})
            return null
        }
        axios.get('http://35.154.246.255:9000/student/' + e.target.value)
            .then((res)=>{
                if(res.status==401){
                    return <Redirect to='/login'/>;

                }
                console.log(res.data)
                console.log(res.data[0]._id)
                if(res.data[0]._id!=null){
                    
                    let prevState = this.state.student
                    prevState.id = res.data[0]._id
                    prevState.rollnumber = res.data[0].rollnumber
                    prevState.year = res.data[0].year
                    prevState.dept = res.data[0].dept
                    prevState.sec = res.data[0].sec
                    this.setState({student: prevState})
                    this.setState({
                        msg: ""
                    })
                    console.log(this.state.student)
                    axios.get('http://35.154.246.255:9000/studentBooks/'+res.data[0].rollnumber)
                    .then((res)=>{
                        console.log(res.data)
                        this.setState({booksID:res.data})
                    })
                }
            })
            .catch((err)=>{
            
            //     if(err.response.status==401){
            //         console.log("Inside-Not Autheticated")
            //         this.props.history.push('/login')

            // }

                this.setState({
                    msg: "No Student Found"
                })
                let prevState = this.state.student
                    prevState.id = null
                    prevState.rollnumber = null
                    prevState.year = null
                    prevState.dept = null
                    prevState.sec = null
                    this.setState({student: prevState})
                console.log("Internal Server Error")
            })
    }

    
  

    renderStudentDetails(){
        if(this.state.student.id==null){
            if(this.state.msg==null){
            return(
                <div>
                    <p></p>
                </div>
            )}else{
                return(
                <div>
                    <div className="studentRecordMessage">
                        <p className="center red-text" >STUDENT NOT FOUND</p>
                    </div >
                    <div className="center">
                    <button onClick={this.changeVisiblity} className="center waves-effect waves-light btn-large"><i class="material-icons right">accessibility_new</i>New Student</button>
                        {!this.state.isHidden &&<InvalidUser changeVisiblity={this.changeVisiblity}/>}
                    </div>
                </div>)
            }
            
        }
        
        else{
            
            return(
                <div>
                    <div className="studentRecordMessage">
                    <p className="center green-text" >STUDENT FOUND</p>
                    </div>
                    <div className="row">
                            <div className="col s4"> 
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle  red lighten-1" >fingerprint</i>
                                        <span className="title">RollNumber</span>
                                        <p> 
                                            <blockquote> {this.state.student.rollnumber}</blockquote>
                                        </p>
                                    </li>

                                    <li className="collection-item avatar">
                                        <i className="material-icons circle indigo lighten-1">account_balance</i>
                                        <span className="title">Department</span>
                                        <p>
                                            <blockquote>{this.state.student.dept}</blockquote>
                                        </p>
                                    </li>

                                    <li className="collection-item avatar">
                                        <i className="material-icons circle  pink lighten-1">beenhere</i>
                                        <span className="title">Year</span>
                                        <p>
                                            <blockquote>{this.state.student.year}</blockquote>
                                        </p>
                                    </li>

                                    <li className="collection-item avatar">
                                        <i className="material-icons circle orange lighten-1">meeting_room</i>
                                        <span className="title">Section</span>
                                        <p>
                                            <blockquote>{this.state.student.sec}</blockquote>
                                        </p>
                                    </li>
                            </ul>
                        </div>

                        <div className="col s1"></div>
                        <div className="col s7">
                            <DisplayStudentDetails rollnumber={this.state.student.rollnumber}/>
                        </div>
                    </div>
                </div>
            )
        }
      }
    
    
    render(){
        
        return(
                <div className="container">
                    <div className="teal-text center mcgraw"> McGraw</div>
                    <div className="teal-text lighten-2 center mcgrawsubtitle"> Internal Tools | Personnel Portal | Build 0.1</div>

                        <div className="center">
                            <form onSubmit={this.handleSubmit}>
                                <input className="search_bar" placeholder="Enter Rollnumber" onChange ={this.handleChange}type="text" name="roll_number"></input>
                            </form>
                            
                        </div>
                        <div>{this.renderStudentDetails()}</div>   

                 </div>
             
            )
        }
     
    
}
export default Home;