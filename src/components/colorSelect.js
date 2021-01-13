import React from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ColorSelect = ({
  colorList,
  baseColor,
  setBaseColor,
  mixColor,
  setMixColor,
  selectDisabled,
}) => {
  const styleObj = colorCode => {
    return {
      "background-color": colorCode,
      width: "24px",
      height: "24px",
      border: "none",
      "border-radius": "4px",
      "margin-right": "4px",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    }
  }
  const baseColorTable = colorList?.map(({ colorCode, color }) => (
    <Button
      style={styleObj(colorCode)}
      onClick={() => setBaseColor(color)}
      disabled={selectDisabled}
    >
      {baseColor === color && <FontAwesomeIcon icon={faCheck} size="0.5x" />}
    </Button>
  ))
  const mixColorTable = colorList?.map(({ colorCode, color }) => (
    <Button
      style={styleObj(colorCode)}
      onClick={() => setMixColor(color)}
      disabled={selectDisabled}
    >
      {mixColor === color && <FontAwesomeIcon icon={faCheck} size="0.5x" />}
    </Button>
  ))

  return (
    <Row>
      <Col className="col-lg-5">
        <Row
          style={{
            display: "flex",
            "align-items": "center",
          }}
        >
          <Form.Control
            plaintext
            style={{ width: "81px", "font-size": "14px" }}
            value="베이스 컬러"
          />
          {baseColorTable}
        </Row>
      </Col>

      <Col className="col-lg-5">
        <Row
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "flex-end",
          }}
        >
          <Form.Control
            plaintext
            style={{ width: "70px", "font-size": "14px" }}
            value="믹스 컬러"
          />
          {mixColorTable}
        </Row>
      </Col>
    </Row>
  )
}

export default React.memo(ColorSelect)
