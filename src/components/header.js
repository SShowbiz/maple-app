import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import StoneSpirit from "../images/stone-spirits.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#20232a`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem 0.55rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img
            src={StoneSpirit}
            style={{ width: "60px", "margin-bottom": "20px" }}
            alt={<div />}
          />
          &nbsp;
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
