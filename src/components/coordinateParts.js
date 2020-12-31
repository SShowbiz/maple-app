import React, { useEffect, useState } from "react"
import { Row, Dropdown, Form, Figure, Button } from "react-bootstrap"

const VERSION = "340"
const REGION = "KMS"

const CoordinateParts = ({
  partsName,
  searchKeyWord,
  setSearchWord,
  selectedParts,
  setSelectedParts,
  partsList,
}) => {
  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    if (initialize) {
      setSearchWord("")
      setInitialize(false)
    }
  }, [initialize, setSearchWord])

  return (
    <Row
      style={{
        display: "flex",
        "align-items": "flex-end",
        "justify-content": "flex-start",
        "margin-bottom": "8px",
        "margin-top": "8px",
      }}
    >
      <Form.Control
        placeholder={`${partsName} 검색 키워드`}
        style={{ width: "180px" }}
        value={searchKeyWord}
        onChange={e => {
          setSearchWord(e.target.value)
        }}
      />
      <Dropdown
        onSelect={eventKey => {
          setInitialize(true)
          setSelectedParts(
            partsList.find(({ id }) => id.toString() === eventKey)
          )
        }}
      >
        <Dropdown.Toggle
          variant="dark"
          id="dropdown-basic"
          style={{ width: "150px" }}
        >
          {partsName} 목록
        </Dropdown.Toggle>
        <Dropdown.Menu className="context">
          {partsList?.map(parts => (
            <Dropdown.Item
              style={{ width: "270px" }}
              eventKey={parts.id}
              event={parts}
            >
              {partsName !== "피부" && (
                <Figure.Image
                  width={20}
                  height={10}
                  src={`https://maplestory.io/api/${REGION}/${VERSION}/item/${parts.id}/icon`}
                />
              )}
              &nbsp; &nbsp;
              {parts.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {selectedParts && (
        <Form.Control
          plaintext
          style={{ width: "300px" }}
          value={`      선택된 ${partsName}: ${selectedParts.name ?? "없음"}`}
        />
      )}
      {selectedParts && partsName !== "피부" && (
        <Button
          variant="danger"
          onClick={() => {
            setSelectedParts(null)
          }}
        >
          X
        </Button>
      )}
      {selectedParts &&
        partsName === "피부" &&
        selectedParts.name !== "크림 피부" && (
          <Button
            variant="danger"
            onClick={() => {
              setSelectedParts({
                id: "12000",
                name: "크림 피부",
              })
            }}
          >
            X
          </Button>
        )}
    </Row>
  )
}

export default React.memo(CoordinateParts)
