/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faMailBulk } from "@fortawesome/free-solid-svg-icons"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Header from "./header"
import Navbar from "./navBar"
import "bootstrap/dist/css/bootstrap.css"
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Container fluid className="px-0 main">
          <Row noGutters className="justify-content-center">
            <Col>
              <Header siteTitle={data.site.siteMetadata.title} />
            </Col>
          </Row>
          <Navbar pageInfo={pageInfo} />
          <Row noGutters>
            <Col>
              <Container className="mt-5">
                <main>{children}</main>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-0">
          {pageInfo?.pageName === "index" && (
            <Row noGutters className="justify-content-center">
              <Col className="footer-col">
                <foot>
                  <a
                    href="https://github.com/SShowbiz"
                    style={{ color: "black" }}
                  >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a
                    href="mailto:hwkim408@snu.ac.kr"
                    style={{ color: "black" }}
                  >
                    <FontAwesomeIcon icon={faMailBulk} size="2x" />
                  </a>
                </foot>
              </Col>
            </Row>
          )}
          <Row noGutters>
            <Col className="footer-col">
              <footer>
                <span>&copy; {new Date().getFullYear()} Built by Syarra</span>
              </footer>
            </Col>
          </Row>
        </Container>
      </>
    )}
  />
)

export default React.memo(Layout)
