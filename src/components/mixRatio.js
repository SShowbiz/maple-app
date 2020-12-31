import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import RangeSlider from "react-bootstrap-range-slider"

const MixRatio = ({
  mixValue,
  setMixValue,
  selectedBaseColor,
  selectedMixColor,
}) => {
  const colorMap = {
    red: "빨",
    orange: "주",
    yellow: "노",
    green: "초",
    blue: "파",
    purple: "보",
    black: "검",
    brown: "갈",
    emerald: "에",
    amethyst: "자",
  }
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
                tooltipLabel={currentValue => {
                  if (selectedBaseColor === selectedMixColor) {
                    return `${colorMap[selectedBaseColor]}`
                  }
                  return `${colorMap[selectedBaseColor] +
                    " " +
                    currentValue +
                    " " +
                    colorMap[selectedMixColor] +
                    " " +
                    (100 - currentValue)}`
                }}
                tooltip="on"
                value={mixValue}
                onChange={changeEvent => setMixValue(changeEvent.target.value)}
                tooltipStyle={{ zIndex: 0 }}
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
