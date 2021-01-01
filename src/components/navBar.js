import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav } from "react-bootstrap"

const CustomNavbar = ({ pageInfo, renderFunc }) => {
  console.log(pageInfo)
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        {/* <Container> */}
        {/* <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">메인</Navbar.Brand>
        </Link> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0rem 1.0875rem`,
          }}
        >
          <Nav className="mr-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/coordinateSimulator" className="link-no-style">
              <Nav.Link
                as="span"
                eventKey="coordinateSimulator"
                onSelect={renderFunc}
              >
                코디 시뮬레이터
              </Nav.Link>
            </Link>
            <Link to="/spellTracesCalculator" className="link-no-style">
              <Nav.Link
                as="span"
                eventKey="spellTracesCalculator"
                onSelect={renderFunc}
              >
                주흔 작 상태 계산기
              </Nav.Link>
            </Link>
            {/* <Link to="/page-2" className="link-no-style">
              <Nav.Link as="span" eventKey="page-2">
                유니온 배치도
              </Nav.Link>
            </Link> */}
          </Nav>
          {/* <Nav className="ml-auto">
            <Form inline onSubmit={e => e.preventDefault()}>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Fake Search"
                  className="mr-2"
                />
              </Form.Group>
              <Button>Fake Button</Button>
            </Form>
          </Nav> */}
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
