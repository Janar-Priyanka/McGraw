import React from 'react';
import Axios from 'axios';


class displayStudentDetails extends React.Component{

    state ={
        rollnumber : null,
        resultStudentBooks:[],
        visibleElement :[]

    }

    componentDidMount(){
        this.getBooks();
        // this.interval = setInterval(() => {
        //     this.getBooks();
        //   }, 2000);
       
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
      }

    getBooks (){
        const rollnumber = this.props.rollnumber
        console.log("Displauy Student Component -" + rollnumber)
        Axios.get("http://35.154.246.255:9000/studentBooks/"+rollnumber)
        .then( res=>{
            this.setState({
                resultStudentBooks: res.data.resultStudentBooks
            })

            console.log("--compomnunt mount--"+this.state.resultStudentBooks)
        })
    }

    handleClick =(bookid,rollnumber,id) =>{
        console.log("HIT",bookid)
        console.log("HIT",rollnumber)
        var probeObject ={
            "rollnumber":rollnumber,
            "book":bookid,
            "delivered":true
        }
        
        Axios({
            method: 'put',
            url: 'http://35.154.246.255:9000/studentBooks',
            data: probeObject
        })
        .then((res)=>{
            this.getBooks();
            console.log("Success-->"+res);
            console.log("visi ->"+this.state.visibleElement)


        })
        .catch((err)=>{
            console.log("Couldnt save Data")
        })
        

    }

    render(){
        const Books = []
        this.state.resultStudentBooks.forEach(element => {
            console.log(element.bookID);

            let tableContent = null;
            if(element.delivered !== null && element.delivered !== false){

               console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(element.deliveryDate));
               var deliveryDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(element.deliveryDate);
                tableContent = (<tr> 
                    <td>{element.BookData.name}</td>
                    <td>{element.BookData.author}</td>
                    <td>{element.BookData.price}</td>
                    <td >{deliveryDate}</td>
                </tr>)
            }
            else{
                tableContent = (<tr>
                    <td>{element.BookData.name}</td>
                    <td>{element.BookData.author}</td>
                    <td>{element.BookData.price}</td>
                    <td key={element.id}><button className="btn" onClick={()=>{this.handleClick(element.bookID,element.rollnumber,element._id)}} >Delivered</button></td>
                </tr>)
            }
            Books.push(tableContent)
        });


        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                {Books}
                </tbody>
            </table>  
            
            </div>
        )
    }
}

export default displayStudentDetails;