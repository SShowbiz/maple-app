import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container className="text-center">
        <Row className="justify-content-center my-3">
          <Col>
            <h1>Maplestory App에 오신 것을 환영합니다!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              본 앱은 메이플스토리를 플레이함에 있어서 도움을 줄 수 있는 다양한
              정보들을 제공하기 위한 앱입니다.
            </p>
            <p>개발자에 대한 정보는 아래를 참고해주세요.</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
