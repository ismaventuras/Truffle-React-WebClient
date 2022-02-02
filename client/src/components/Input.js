import { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"


export const Input = ({ input, state, setState }) => {

    const [value, setValue] = useState('')
  
    const onChange = async (e) => {
      e.preventDefault()
      setValue(e.target.value)
      setState({ ...state, [input.name]: e.target.value })
    }
  
  
    return (
      <>
        <FloatingLabel controlId={input.name} label={input.name}>
          <Form.Control type="text" placeholder={input.type} value={value} onChange={onChange} />
        </FloatingLabel>
      </>
    )
  }
  