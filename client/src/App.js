import { Container, Row, Col, Form, FloatingLabel, Tab, Tabs } from 'react-bootstrap'
import { useState } from 'react'

import { ethers } from 'ethers'

import { FunctionForm } from './components/FunctionForm'
import { Header } from './components/Header'
import JSONInput from './components/JSONInput'



const FunctionIOLoader = ({ contract_obj }) => {
  const { abi, contract, name } = contract_obj

  const [output, setOutput] = useState('')

  const viewFunctions = abi.filter(item => {
    if (item.type === 'function' && item.stateMutability === "view") return item
  })
  const writeFunctions = abi.filter(item => {
    if (item.type === 'function' && item.stateMutability !== "view") return item
  })
  /**
   * --------
   * First row for name of the token
   * Second row to load the forms
   * 
   */
  return (
    <>
      {/** Name of the contract and TO-DO drag and drop json */}
      <Row className='text-center'>
        <Col>
          <h2 >Contract <i>{name}</i></h2>
        </Col>
      </Row>
      {/** A row where each function of the contract is created as a form, one tab for state changing tx and another tab for readonly txs */}
      <Row className="">
        <Col xs={12}>
          <Tabs>
            <Tab eventKey="WriteFunctions" title="Write Functions" className='mt-2 mb-2'>
              <Row>
                <Col>
                  <div className='mt-2'>
                    {writeFunctions.map(item => (
                      <FunctionForm key={item.name} methodName={item.name} inputs={item.inputs} contract={contract} stateMutability={item.stateMutability} setOutput={setOutput} />
                    ))}
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="ReadFunctions" title="Read Functions">
              <Row>
                <Col>
                  <div className='mt-2'>
                    {viewFunctions.map(item => (
                      <FunctionForm key={item.name} methodName={item.name} inputs={item.inputs} contract={contract} stateMutability={item.stateMutability} setOutput={setOutput} />
                    ))}
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
        <Col>
          <FloatingLabel controlId="output" label="output or error">
            <Form.Control type="text" placeholder="output or error" value={output} readOnly />
          </FloatingLabel>
        </Col>
      </Row>
      {/* <Row className="border-top mt-3">
        <h3>TODO - events</h3>
      </Row> */}

    </>
  )
}


function App() {

  const [contract, setContract] = useState()

  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()

  return (

    <Container className="mt-2 h-100">
      <Header />
      {/* <FunctionIOLoader contract_obj={contract} /> */}
      {
        contract
          ?
          <FunctionIOLoader contract_obj={contract} />
          :
          <Container className="justify-content-center align-items-center d-flex flex-column h-50">
            <h3> Upload a contract compiled by Truffle to generate a form with the methods</h3>
            <JSONInput setContract={setContract} signer={signer} />
          </Container>
      }

    </Container>
  );
}

export default App;
