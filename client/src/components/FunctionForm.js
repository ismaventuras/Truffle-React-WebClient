import { useState } from "react"
import { ethers } from "ethers"
import {Row, Col, Button} from 'react-bootstrap'

import { Input } from "./Input"


/**
 * Generate a Form from an input field from an ABI file 
 * 
 * Layout:
 * methodName 
 * . . . inputs , button
 * 
 * @param {*} param0 
 * @returns 
 */

export const FunctionForm = ({ methodName, inputs, contract, stateMutability, setOutput }) => {

    const [state, setState] = useState()
  
    const onClick = async (event) => {
      const names = inputs.map(input => input.name)
      setOutput('')
      event.preventDefault()
      try{
        switch (stateMutability) {
          case "view":
            if (state === undefined) {
              let result = await contract[methodName]()
              if (ethers.BigNumber.isBigNumber(result)) result = parseFloat(ethers.utils.formatEther(result)) // if result from blockchain is a bignumber, parseit 
              setOutput(result)
              console.log(result)
            }
            else {
              const result = await contract[methodName](...Object.values(state))                  
              setOutput(result)
              console.log(result)
            }
            break
          default:
            if (state === undefined) {
              const tx = await contract[methodName]()
              let receipt = await tx.wait()
              setOutput(receipt.transactionHash)
            }
            else {
              const tx = await contract[methodName](...Object.values(state))
              let receipt = await tx.wait()
              setOutput(receipt.transactionHash)
            }
        }
      }
      catch(error){
        setOutput(error.message)
      }
  
    }
    return (
      <Row className='align-items-center mb-2 mt-2'>
        {/** for each method (row) we create every input in a Col*/}
        <h4>{methodName}</h4>
        {inputs.map(input => <Col key={input.name} ><Input input={input} contract={contract} state={state} setState={setState} /></Col>)}
        <Col xs={6} className="">
          <Button onClick={onClick}>Send</Button>
        </Col>
      </Row>
    )
  }