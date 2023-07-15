import React, { useEffect } from 'react'
import "./home.css"
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import axios from "axios"

function Home() {
  const [query,setQuery] = useState()
  const [columnName,setColumnName] = useState([])
  const [listData,setListData] = useState([])
  const [queryData,setQueryData] = useState()
  const [flag,setFlag] =useState(0)


  useEffect(()=>{
    getTable()
  },[])

  function getTable(){
    axios.get('http://localhost:8080/all')
      .then(function (response) {
        setColumnName(response.data.column); 
       const filteredData =  response.data.data.filter((item)=>{return item.id<12});
       setListData(filteredData)  

    })
      .catch(function (error) {
       console.log(error);
    })
    }
   
    function handleClick() {
      axios.get('http://localhost:8080/query', {
        params: {
          query: query
        }
      })
        .then(function (response) {            
            const filteredData = response.data.data.map(item=>{return item.data.split(',')});                     
            setQueryData(filteredData.filter((item)=> {return item[0] <20}))
            
          }               
        )
        .catch(function (error) {
             console.log(error);          
        });
    }
    
    console.log("query",queryData)
  return ( 
    <div className='Home'>
        <div className='heading'><h1>Table Data</h1></div>
        <div className='body'>       


        <Row style={{marginTop:"2rem"}}>
          <Form.Label  style={{fontSize:"1.5rem" ,fontWeight:"500",marginLeft:"1.5rem"}}>All values</Form.Label>
        <Table className='table' striped bordered hover style={{width:"95%"}}>
      <thead style={{textAlign:"center",padding:"5px"}}>
        <tr>
          {columnName.map((res)=>{return <th style={{padding:"8px"}}>{res}</th>})}                 
        </tr>
      </thead>
      <tbody>
        {listData.map((item) => (          
          <tr key={item.id}>
            <td>{item.medianHouseValue}</td>
            <td>{item.medianIncome}</td>
            <td>{item.medianAge}</td>
            <td>{item.totRooms}</td>
            <td>{item.totBedrooms}</td>
            <td>{item.population}</td>
            <td>{item.households}</td>
            <td>{item.latitude}</td>
            <td>{item.longitude}</td>
            <td>{Math.trunc(item.distanceToCoast)}</td>
            <td>{Math.trunc(item.distanceToLA)}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
        </Row>

        <Row style={{marginTop:"1rem"}}>
            <Form>
                 <Form.Group className="mb-3 inputStyle" controlId="exampleForm.ControlInput1">
                     <Form.Label style={{fontSize:"1.5rem" ,fontWeight:"500"}}>Query</Form.Label>
                     <Form.Control type="text"  onChange={(e)=>{setQuery(e.target.value)}}/>
                     <span className="text-danger">{flag === 1 ? 'Please enter a valid query' : null}</span><br></br>
                     <Button style={{marginTop:"0.5rem"}} onClick={handleClick}>Run Query</Button>
                 </Form.Group>                 
    </Form>      
        </Row>


      {queryData === undefined  ? '' :  <Row style={{marginTop:"1rem"}}>
          <Form.Label  style={{fontSize:"1.5rem" ,fontWeight:"500",marginLeft:"1.5rem"}}>Results</Form.Label>
        <Table className='table' striped bordered hover style={{width:"95%"}}>
      <thead style={{textAlign:"center",padding:"5px"}}>
        <tr>
          {columnName.map((res)=>{return <th style={{padding:"8px"}}>{res}</th>})}                 
        </tr>
      </thead>
      <tbody>
        {queryData.map((item) => (                  
                 
            <tr>
               {console.log("inner",item)}
             <td>{item[1]}</td>
             <td>{item[2]}</td>
             <td>{item[2]}</td>
             <td>{item[3]}</td>
             <td>{item[4]}</td>
             <td>{item[5]}</td>
             <td>{item[6]}</td>
             <td>{item[7]}</td>
             <td>{item[8]}</td>
             <td>{Math.trunc(item[9])}</td>
             <td>{Math.trunc(item[10])}</td> 
             
           </tr>
           ))
           
        }
      </tbody>
    </Table>
        </Row>}  
       
    </div>
   </div>
  )
}

export default Home