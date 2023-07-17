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
  const [allColumnName,setAllColumnName] = useState([])
  const [allListData,setAllListData] = useState([])
  const [queryData,setQueryData] = useState()
  const [flag,setFlag] =useState(0)
  const [errorMessage,setErrorMessage] =useState(0)
  var firstObjectKeys=[]


  useEffect(()=>{
    getTable()
  },[])

  function getTable(){
    axios.get('http://localhost:8080/all')
      .then(function (response) {
        setAllColumnName(response.data.column); 
       const filteredData =  response.data.data.filter((item)=>{return item.id<12});
       setAllListData(filteredData)  

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
          if(response.status === 200)
          {      
            setFlag(0)      
            setQueryData(response.data.data) 
          }                   
          }               
        )
        .catch(function (error) {
          setErrorMessage(error.response.data.erroMessage)
          setFlag(1)
             
        });
    }
    
             
  if (queryData !== undefined) 
  firstObjectKeys.push(Object.keys(queryData[0]))
  
  return ( 
    <div className='Home'>
        <div className='heading'><h1>Table Data</h1></div>
        <div className='body'>       


        <Row style={{marginTop:"2rem"}}>
          <Form.Label  style={{fontSize:"1.5rem" ,fontWeight:"500",marginLeft:"1.5rem"}}>All values</Form.Label>
        <Table className='table' striped bordered hover style={{width:"95%"}}>
      <thead style={{textAlign:"center",padding:"5px"}}>
        <tr>
          {allColumnName.map((res)=>{return <th style={{padding:"8px"}}>{res}</th>})}                 
        </tr>
      </thead>
      <tbody>
        {allListData.map((item) => (          
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
            <td>{Math.trunc(item.distance_to_coast)}</td>
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
                     <span className="text-danger">{flag === 1? errorMessage : ''}</span><br></br>
                     <Button style={{marginTop:"0.5rem"}} onClick={handleClick}>Run Query</Button>
                 </Form.Group>                 
    </Form>      
        </Row>


      {queryData === undefined && flag === 0 ? '' :  <Row style={{marginTop:"1rem"}}>
          <Form.Label  style={{fontSize:"1.5rem" ,fontWeight:"500",marginLeft:"1.5rem"}}>Results</Form.Label>
        <Table className='table' striped bordered hover style={{width:"auto"}}>        
      <thead style={{textAlign:"center",padding:"5px"}}>
        <tr>{firstObjectKeys[0].map((res)=>{return <th style={{padding:"8px"}}>{res}</th>})}</tr>


           

      </thead>
      <tbody> 
      {
        queryData.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value) => (
              <td key={value}>{value}</td>
            ))}
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