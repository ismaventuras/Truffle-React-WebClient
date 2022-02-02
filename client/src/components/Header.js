import {Image, Row, Col} from 'react-bootstrap'

export const Header = () => {
    return(
    <Row className="mb-4 border-bottom">
      <Col xs={8}><h1 className='display-2'>Contract helper </h1></Col>
      <Col xs={4} className="d-flex flex-column align-items-center">
        <a href='https://github.com/ismaventuras' target="_blank" rel='noreferrer'><Image width="75px" src='/Octocat.png' fluid /></a>
        <p>My github 🙋‍♂️</p>
      </Col>
    </Row>
    )
  }
  