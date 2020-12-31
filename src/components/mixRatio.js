import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import RangeSlider from "react-bootstrap-range-slider"

const MixRatio = ({ mixValue, setMixValue }) => {
  return (
    <div>
      <Row>
        <Col className="col-lg-10">
          <Row>
            <Form.Control
              plaintext
              style={{ width: "81px", "font-size": "14px" }}
              value="믹스 비율"
            />
            <Col style={{ padding: 0 }}>
              <RangeSlider
                size="sm"
                variant="dark"
                tooltipLabel={currentValue => `${currentValue}%`}
                tooltip="on"
                value={mixValue}
                onChange={changeEvent => setMixValue(changeEvent.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
    </div>
  )
}

export default React.memo(MixRatio)
