import { useState } from 'react'
import { ethers } from 'ethers'

import { Button, Container, Form } from 'react-bootstrap'

const JSONInput = ({ setContract, signer }) => {

    const [deployedOn, setDeployedOn] = useState()
    const [loadedFile, setLoadedFile] = useState()
    const [error,setError] = useState('')

    const onChange = (event) => {
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(event.target.files[0])
        fileReader.onload = e => {
            try {
                let parsedJson = JSON.parse(e.target.result)
                setLoadedFile(parsedJson)
                setDeployedOn(Object.keys(parsedJson.networks))
            }
            catch (error) {
                setError(error.message)
            }

        }
    }

    const onClick = (e) => {
        const { networks, abi, contractName } = loadedFile
        const contract = new ethers.Contract(networks[e.target.innerText].address, abi, signer)
        setContract({ "contract": contract, "name": contractName, "abi": abi })
    }

    return (
        <>
            <Form.Control
                type='file'
                accept='application/JSON'
                onChange={onChange}
                className="w-50 m-2"
            />
            {error && <p>{error}</p>}
            {deployedOn &&
                <>
                    <p>{deployedOn.length > 0 ? "Select a network:" : "The uploaded contract is not deployed"}</p>
                    <Container className="justify-content-center d-flex gap-5 flex-row">
                        {deployedOn.map(network => (
                            <Button onClick={onClick} key={network}>{network}</Button>
                        ))}
                    </Container>
                </>
            }
        </>
    )
}

export default JSONInput