import React from 'react';
import Axios from 'axios';
import './admin.css'

class admin extends React.Component{
    
    state ={
        "books":null
    }
    componentDidMount =()=>{
        
        this.getBooks()
    }

    getBooks (){
        console.log("Stock Component Did Mount")
        Axios.get("http://35.154.246.255:9000/bookAll")
        .then( res=>{
            console.log("---------Books----"+res)
            this.setState({
                books:res.data
            })

        })
    }
    
    
    
    render(){
        var BooksStock = []
        if(this.state.books!= null){
            let tableContent = null;
            
            this.state.books.forEach(element => {
                tableContent = (<tr> 
                    <td>{element.name}</td>
                    <td>{element.author}</td>
                    <td>{element.price}</td>
                    <td >{element.stock}</td>
                </tr>)
                BooksStock.push(tableContent)
            });
        }
        

        return(<div className="center container ">
        <h3 className="center purple-text">Inventory Monitor</h3><br></br>
        <table className="responsive-table striped ">
                <thead className="purple-text">
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Stock Remaining </th>
                    </tr>
                </thead>
                <tbody>
                    {BooksStock}
                </tbody>
            </table>  
        </div>
        
        )
    }
}

export default admin;