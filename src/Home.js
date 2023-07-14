import React from 'react'
import "./home.css"
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Table from 'react-bootstrap/Table'
import { useState } from 'react';

function Home() {

    const [query,setQuery] = useState()
console.log(query)

   
function handleClick(){
        
}
  return ( 
    <div className='Home'>
        <div className='heading'><h1>Table Data</h1></div>
        <div className='body'>       


        <Row style={{marginTop:"5rem"}}>
        <Table className='table' striped bordered hover>
      <thead style={{textAlign:"center",padding:"5px"}}>
        <tr>
          <th>#</th>
          <th>Median House Value</th>
          <th>Median Income</th>
          <th>Median Age</th>
          <th>Total Rooms</th>
          <th>Total Bedrooms</th>
          <th>Population</th>
          <th>Households</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Distance to coast</th>
          <th>Distance to San Diego</th>
          <th>Distance to San Jose</th>        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@md</td>
        </tr>           
      </tbody>
    </Table>
        </Row>

        <Row style={{marginTop:"2rem"}}>
            <Form>
                 <Form.Group className="mb-3 inputStyle" controlId="exampleForm.ControlInput1">
                     <Form.Label style={{fontSize:"1.5rem" ,fontWeight:"500"}}>Query</Form.Label>
                     <Form.Control type="text"  onChange={(e)=>{setQuery(e.target.value)}}/>
                     <Button style={{marginTop:"0.5rem"}} onClick={handleClick}>Run Query</Button>
                 </Form.Group>
    </Form>
        </Row>
    </div>
   </div>
  )
}

export default Home