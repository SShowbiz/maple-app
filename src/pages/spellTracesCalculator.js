import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  Row,
  Col,
  Container,
  Figure,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import spellTracesExplanation from "../img/spellTraces/spellTracesExplanation.svg"
import spellTracesCalculation from "../img/spellTraces/spellTracesCalculation.svg"
import enforceNumber from "../img/spellTraces/enforceNumber.svg"
import bossArmorStarforceEnforce from "../img/spellTraces/bossArmorStarforceEnforce.svg"
import bossArmorStats from "../img/spellTraces/bossArmorStats.svg"
import bossGloveStarforceEnforce from "../img/spellTraces/bossGloveStarforceEnforce.svg"
import bossGloveStats from "../img/spellTraces/bossGloveStats.svg"
import { REGION, VERSION } from "../assets/itemConfig"

const ascending = (firstItem, secondItem) => {
  return firstItem.name < secondItem.name
    ? -1
    : firstItem.name > secondItem.name
    ? 1
    : 0
}
const SpellTracesCalculator = () => {
  const [necroSet, setNecroSet] = useState(null)
  const [vonLeonSet, setVonLeonSet] = useState(null)
  const [signusSet, setSignusSet] = useState(null)
  const [rootAbyssSet, setRootAbyssSet] = useState(null)
  const [absolabsSet, setAbsolabsSet] = useState(null)
  const [arcaneshadeSet, setArcaneshadeSet] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedWeaponCategory, setSelectedWeaponCategory] = useState(null)
  const [selectedWeaponList, setSelectedWeaponList] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)
  const [weaponSearch, setWeaponSearch] = useState("")
  const [weaponEnforceNumber, setWeaponEnforceNumber] = useState(null)
  const [weaponMainStats, setWeaponMainStats] = useState(null)
  const [weaponSubStats, setWeaponSubStats] = useState(null)
  const [weaponResult, setWeaponResult] = useState("")

  const [selectedArmorCategory, setSelectedArmorCategory] = useState(null)
  const [selectedArmorJob, setSelectedArmorJob] = useState(null)
  const [selectedArmorList, setSelectedArmorList] = useState(null)
  const [selectedArmorListJob, setSelectedArmorListJob] = useState(null)
  const [selectedArmor, setSelectedArmor] = useState(null)
  const [armorSearch, setArmorSearch] = useState("")
  const [armorStarforceNumber, setArmorStarforceNumber] = useState(null)
  const [armorEnforceNumber, setArmorEnforceNumber] = useState(null)
  const [armorFirstStats, setArmorFirstStats] = useState(null)
  const [aromorSecondStats, setArmorSecondStats] = useState(null)
  const [armorResult, setArmorResult] = useState("")
  const [armorAttackPower, setArmorAttackPower] = useState(null)

  const jobMap = {
    Warrior: "전사",
    Magician: "마법사",
    Bowman: "궁수",
    Thief: "도적",
    Pirate: "해적",
  }
  const intLuk = ["INT", "LUK"]
  const strDex = ["STR", "DEX"]
  const dexStr = ["DEX", "STR"]
  const lukDex = ["LUK", "DEX"]
  const hpStr = ["HP", "STR"]
  const strDexLuk = ["STR", "DEX", "LUK"]

  const weaponToStatMap = {
    "Shining Rod": intLuk,
    "Soul Shooter": dexStr,
    Desperado: hpStr,
    "Whip Blade": strDexLuk,
    "Psy-limiter": intLuk,
    Chain: lukDex,
    Gauntlet: intLuk,
    "Ritual Fan": lukDex,
    "One-Handed Sword": strDex,
    "One-Handed Axe": strDex,
    "One-Handed Blunt Weapon": strDex,
    Dagger: lukDex,
    Katara: lukDex,
    Cane: lukDex,
    Wand: intLuk,
    Staff: intLuk,
    "Two-Handed Sword": strDex,
    "Two-Handed Axe": strDex,
    "Two-Handed Blunt": strDex,
    Spear: strDex,
    "Pole Arm": strDex,
    Bow: dexStr,
    Crossbow: dexStr,
    Claw: lukDex,
    Knuckle: strDex,
    Gun: dexStr,
    "Dual Bowgun": dexStr,
    "Hand Cannon": strDex,
    "Arm Cannon": strDex,
    "Ancient Bow": strDex,
  }

  const jobToStatMap = {
    Warrior: strDex,
    Bowman: dexStr,
    Magician: intLuk,
    Thief: lukDex,
    Pirate: strDex,
  }
  const objToList = obj => {
    return Object.keys(obj).map(selectedKey => obj[selectedKey])
  }
  const fetchData = useCallback(async () => {
    const { data } = await axios.get(
      `https://maplestory.io/api/${REGION}/${VERSION}/item/category/equip`
    )
    const necroObj = {}
    const vonLeonObj = {}
    const signusObj = {}
    const rootAbyssObj = {}
    const absolabsObj = {}
    const arcaneshadeObj = {}

    const isNecroSet = item => {
      return item?.name?.includes("네크로") && item.requiredLevel === 120
    }
    const isVonLeonSet = item => {
      return item?.name?.includes("반 레온") && item.requiredLevel === 130
    }
    const isSignusSet = item => {
      return (
        (item?.name?.includes("라이온하트") ||
          item?.name?.includes("팔콘윙") ||
          item?.name?.includes("드래곤테일") ||
          item?.name?.includes("레이븐혼") ||
          item?.name?.includes("샤크투스")) &&
        item?.requiredLevel === 140
      )
    }
    const isRootAbyssSet = item => {
      return (
        (item?.name?.includes("하이네스") ||
          item?.name?.includes("이글아이") ||
          item?.name?.includes("트릭스터") ||
          item?.name?.includes("파프니르")) &&
        item?.requiredLevel === 150
      )
    }
    const isAbsolabsSet = item => {
      return item?.name?.includes("앱솔랩스") && item?.requiredLevel === 160
    }
    const isArcaneshadeSet = item => {
      return item?.name?.includes("아케인셰이드") && item?.requiredLevel === 200
    }

    data.forEach(item => {
      if (isNecroSet(item) && !necroObj[item?.name]) {
        necroObj[item?.name] = item
      } else if (isVonLeonSet(item) && !vonLeonObj[item?.name]) {
        vonLeonObj[item?.name] = item
      } else if (isSignusSet(item) && !signusObj[item?.name]) {
        signusObj[item?.name] = item
      } else if (isRootAbyssSet(item) && !rootAbyssObj[item?.name]) {
        rootAbyssObj[item?.name] = item
      } else if (isAbsolabsSet(item) && !absolabsObj[item?.name]) {
        absolabsObj[item?.name] = item
      } else if (isArcaneshadeSet(item) && !arcaneshadeObj[item?.name]) {
        arcaneshadeObj[item?.name] = item
      }
    })

    setNecroSet(objToList(necroObj).sort(ascending))
    setVonLeonSet(objToList(vonLeonObj).sort(ascending))
    setSignusSet(objToList(signusObj).sort(ascending))
    setRootAbyssSet(objToList(rootAbyssObj).sort(ascending))
    setAbsolabsSet(objToList(absolabsObj).sort(ascending))
    setArcaneshadeSet(objToList(arcaneshadeObj).sort(ascending))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const styleObj = {
    width: "158px",
    height: "38px",
    border: "none",
    "border-radius": "4px",
    "border-color": "#ffffff",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "margin-right": "2px",
    "margin-bottom": "2px",
    hover: { "background-color": "#323232" },
  }

  return (
    <Layout
      pageInfo={{ pageName: "spellTracesCalculator" }}
      renderFunc={() => setSelectedCategory(null)}
    >
      <SEO title="Spell Traces Calculator" />
      <Container
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <Row>
          <Button
            variant={selectedCategory === "bossWeapon" ? "primary" : "dark"}
            style={styleObj}
            onClick={() => {
              setSelectedCategory("bossWeapon")
              setSelectedWeapon(null)
              setSelectedWeaponCategory(null)
              setSelectedWeaponList(null)
              setSelectedArmor(null)
              setSelectedArmorCategory(null)
              setSelectedArmorList(null)
              setSelectedArmorJob(null)
            }}
          >
            {"보스 무기"}
          </Button>
          <Button
            variant={selectedCategory === "bossArmor" ? "primary" : "dark"}
            style={styleObj}
            onClick={() => {
              setSelectedCategory("bossArmor")
              setSelectedWeapon(null)
              setSelectedWeaponCategory(null)
              setSelectedWeaponList(null)
              setSelectedArmor(null)
              setSelectedArmorCategory(null)
              setSelectedArmorList(null)
              setSelectedArmorJob(null)
            }}
          >
            {"보스 방어구"}
          </Button>
          <Button
            variant={selectedCategory === "bossAccessory" ? "primary" : "dark"}
            style={styleObj}
            onClick={() => {
              window.alert("추가 예정입니다!")
              setSelectedWeapon(null)
              setSelectedWeaponCategory(null)
              setSelectedWeaponList(null)
              setSelectedArmor(null)
              setSelectedArmorCategory(null)
              setSelectedArmorList(null)
              setSelectedArmorJob(null)
              // setSelectedCategory("bossAccessory")
            }}
          >
            {"보스 장신구"}
          </Button>
        </Row>
        {selectedCategory === "bossWeapon" && (
          <div>
            <Row>
              <Button
                variant={
                  selectedWeaponCategory === "Necro" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Necro")
                  setSelectedWeaponList(
                    necroSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                네크로 세트
              </Button>
              <Button
                variant={
                  selectedWeaponCategory === "Von Leon" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Von Leon")
                  setSelectedWeaponList(
                    vonLeonSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                반 레온 세트
              </Button>
              <Button
                variant={
                  selectedWeaponCategory === "Signus" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Signus")
                  setSelectedWeaponList(
                    signusSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                여제 세트
              </Button>
              <Button
                variant={
                  selectedWeaponCategory === "Root Abyss" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Root Abyss")
                  setSelectedWeaponList(
                    rootAbyssSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                루타비스 세트
              </Button>
              <Button
                variant={
                  selectedWeaponCategory === "Absolabs" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Absolabs")
                  setSelectedWeaponList(
                    absolabsSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                앱솔랩스 세트
              </Button>
              <Button
                variant={
                  selectedWeaponCategory === "Arcaneshade" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedWeaponCategory("Arcaneshade")
                  setSelectedWeaponList(
                    arcaneshadeSet.filter(item =>
                      item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedWeapon(null)
                }}
              >
                아케인셰이드 세트
              </Button>
            </Row>
            &nbsp;
            <Row>
              <Form.Control
                placeholder={`무기 검색 키워드`}
                style={{ width: "180px" }}
                value={weaponSearch}
                onChange={e => {
                  setWeaponSearch(e.target.value)
                }}
              />
              <Dropdown
                onSelect={eventKey => {
                  setWeaponSearch("")
                  setSelectedWeapon(
                    selectedWeaponList.find(
                      ({ id }) => id.toString() === eventKey
                    )
                  )
                  setWeaponEnforceNumber(1)
                  setWeaponMainStats(0)
                  setWeaponSubStats(0)
                }}
              >
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{ width: "150px" }}
                >
                  무기 목록
                </Dropdown.Toggle>
                <Dropdown.Menu className="context">
                  {selectedWeaponList
                    ?.filter(item => item?.name?.includes(weaponSearch))
                    ?.map(parts => (
                      <Dropdown.Item
                        style={{ width: "270px" }}
                        eventKey={parts.id}
                        event={parts}
                      >
                        <Figure.Image
                          width={20}
                          height={10}
                          src={`https://maplestory.io/api/${REGION}/${VERSION}/item/${parts.id}/icon`}
                        />
                        &nbsp; &nbsp;
                        {parts.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            {!selectedWeapon && (
              <Row>
                &nbsp;
                <div>
                  <p style={{ color: "red" }}>
                    주흔 작 상태를 확인할 무기를 선택해주세요.
                  </p>
                </div>
              </Row>
            )}
            {selectedWeapon &&
              (selectedWeapon.typeInfo.subCategory === "Desperado" ||
                selectedWeapon.typeInfo.subCategory === "Whip Blade") && (
                <Row>
                  &nbsp;
                  <div>
                    <p style={{ color: "red" }}>
                      제논, 데몬 어벤져는 추후 추가됩니다!
                    </p>
                  </div>
                </Row>
              )}
            <Row>
              <Col
                style={{
                  display: "flex",
                  "align-items": "center",
                  "max-width": "50%",
                  "justify-content": "center",
                }}
              >
                <div>
                  {selectedWeapon &&
                    selectedWeapon.typeInfo.subCategory !== "Desperado" &&
                    selectedWeapon.typeInfo.subCategory !== "Whip Blade" && (
                      <div style={{ "text-align": "center" }}>
                        <Row className="justify-content-center">
                          <div
                            style={{
                              width: "100px",
                              height: "100px",
                              "line-height": "50px",
                              border: "2px solid black",
                              padding: "10px",
                              "border-radius": "6px",
                              display: "flex",
                              "justify-content": "center",
                              "align-items": "center",
                            }}
                          >
                            <Figure.Image
                              style={{
                                margin: 0,
                                "max-width": "100%",
                                "max-height": "100%",
                              }}
                              margin={0}
                              width={70}
                              src={`https://maplestory.io/api/${REGION}/${VERSION}/item/${selectedWeapon?.id}/icon`}
                            />
                          </div>
                        </Row>
                        &nbsp;
                        <Row className="justify-content-center">
                          선택된 무기: {selectedWeapon.name}
                          <br /> 착용 레벨: {selectedWeapon.requiredLevel}
                          <br /> 착용 가능 직업:{" "}
                          {selectedWeapon.requiredJobs
                            .map(job => jobMap[job])
                            .join(", ")}
                        </Row>
                      </div>
                    )}
                </div>
              </Col>
              <Col className="col-lg-6">
                <Row>&nbsp;</Row>
                {selectedWeapon &&
                  selectedWeapon.typeInfo.subCategory !== "Desperado" &&
                  selectedWeapon.typeInfo.subCategory !== "Whip Blade" && (
                    <div>
                      <Row>
                        <Col
                          style={{
                            display: "flex",
                            "align-items": "center",
                            "justify-content": "center",
                          }}
                        >
                          <Figure>
                            <Figure.Image
                              style={{
                                "border-radius": "10px",
                                width: "250px",
                              }}
                              src={enforceNumber}
                            />
                            <Figure.Caption style={{ "text-align": "center" }}>
                              푸른색 상자 속 숫자: "작 된 횟수"
                            </Figure.Caption>
                          </Figure>
                        </Col>
                        <Col>
                          <Figure>
                            <Figure.Image
                              style={{
                                "border-radius": "10px",
                                width: "200px",
                              }}
                              src={spellTracesCalculation}
                            />
                            <Figure.Caption style={{ "text-align": "center" }}>
                              붉은색 상자 속 숫자: "증가 능력치"
                            </Figure.Caption>
                          </Figure>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        "작된 횟수"와 "증가한 능력치"를 위 그림의 푸른색 상자와
                        붉은색 상자 내부의 수치를 참고하여 적어주세요.
                      </Row>
                      <br />
                      <Row>
                        <Form.Control
                          plaintext
                          style={{ width: "70px" }}
                          value="작 횟수"
                        />
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder={`주문서 작 횟수`}
                          style={{ width: "180px", "margin-bottom": "2px" }}
                          value={weaponEnforceNumber}
                          onChange={e => {
                            setWeaponEnforceNumber(e.target.value)
                          }}
                        />
                      </Row>

                      {weaponToStatMap[selectedWeapon.typeInfo.subCategory].map(
                        (stat, index) => (
                          <div>
                            <Row>
                              <Form.Control
                                plaintext
                                style={{ width: "70px" }}
                                value={stat}
                              />
                              <Form.Control
                                type="number"
                                min={0}
                                placeholder={`증가한 ${stat} 수치`}
                                style={{
                                  width: "180px",
                                  "margin-bottom": "2px",
                                }}
                                value={
                                  index === 0 ? weaponMainStats : weaponSubStats
                                }
                                onChange={e => {
                                  if (index === 0) {
                                    setWeaponMainStats(e.target.value)
                                  } else {
                                    setWeaponSubStats(e.target.value)
                                  }
                                }}
                              />
                            </Row>
                          </div>
                        )
                      )}
                      <br />
                      <Row>
                        <Button
                          variant="dark"
                          style={styleObj}
                          onClick={() => {
                            const x = parseInt(
                              (weaponMainStats - weaponSubStats) /
                                weaponEnforceNumber
                            )
                            const y =
                              (weaponMainStats - weaponSubStats) %
                              weaponEnforceNumber
                            const z = [100, 70, 30, 15]
                            if (
                              weaponMainStats < 0 ||
                              weaponSubStats < 0 ||
                              weaponEnforceNumber < 0 ||
                              (x === 4 && y !== 0) ||
                              x < 1 ||
                              x > 4 ||
                              (x > 0 &&
                                x < 4 &&
                                (y < 0 || y > weaponEnforceNumber - 1))
                            ) {
                              setWeaponResult(`잘못된 입력입니다!`)
                            } else if (y === 0) {
                              setWeaponResult(
                                `${z[x - 1]}% 주문서 ${weaponEnforceNumber}장`
                              )
                            } else {
                              setWeaponResult(
                                `${z[x - 1]}% 주문서 ${weaponEnforceNumber -
                                  y}장, ${z[x]}% 주문서 ${y}장`
                              )
                            }
                          }}
                        >
                          작 상태 계산하기
                        </Button>
                        {weaponResult && (
                          <Form.Control
                            plaintext
                            style={{ width: "250px", color: "red" }}
                            value={`  ${weaponResult}`}
                          />
                        )}
                      </Row>
                    </div>
                  )}
              </Col>
            </Row>
          </div>
        )}
        {selectedCategory === "bossArmor" && (
          <div>
            <Row>
              <Button
                variant={selectedArmorCategory === "Necro" ? "primary" : "dark"}
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Necro")
                  setSelectedArmorList(
                    necroSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                네크로 세트
              </Button>
              <Button
                variant={
                  selectedArmorCategory === "Von Leon" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Von Leon")
                  setSelectedArmorList(
                    vonLeonSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                반 레온 세트
              </Button>
              <Button
                variant={
                  selectedArmorCategory === "Signus" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Signus")
                  setSelectedArmorList(
                    signusSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                여제 세트
              </Button>
              <Button
                variant={
                  selectedArmorCategory === "Root Abyss" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Root Abyss")
                  setSelectedArmorList(
                    rootAbyssSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                루타비스 세트
              </Button>
              <Button
                variant={
                  selectedArmorCategory === "Absolabs" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Absolabs")
                  setSelectedArmorList(
                    absolabsSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                앱솔랩스 세트
              </Button>
              <Button
                variant={
                  selectedArmorCategory === "Arcaneshade" ? "primary" : "dark"
                }
                style={styleObj}
                onClick={() => {
                  setSelectedArmorCategory("Arcaneshade")
                  setSelectedArmorList(
                    arcaneshadeSet.filter(
                      item => !item.typeInfo.category.includes("Weapon")
                    )
                  )
                  setSelectedArmor(null)
                  setSelectedArmorJob(null)
                  setSelectedArmorListJob(null)
                }}
              >
                아케인셰이드 세트
              </Button>
            </Row>
            {selectedArmorList && (
              <Row>
                <Button
                  variant={selectedArmorJob === "Warrior" ? "primary" : "dark"}
                  style={styleObj}
                  onClick={() => {
                    setSelectedArmorListJob(
                      selectedArmorList.filter(item =>
                        item.requiredJobs.includes("Warrior")
                      )
                    )
                    setSelectedArmorJob("Warrior")
                    setSelectedArmor(null)
                  }}
                >
                  전사
                </Button>
                <Button
                  variant={selectedArmorJob === "Bowman" ? "primary" : "dark"}
                  style={styleObj}
                  onClick={() => {
                    setSelectedArmorListJob(
                      selectedArmorList.filter(item =>
                        item.requiredJobs.includes("Bowman")
                      )
                    )
                    setSelectedArmorJob("Bowman")
                    setSelectedArmor(null)
                  }}
                >
                  궁수
                </Button>
                <Button
                  variant={selectedArmorJob === "Magician" ? "primary" : "dark"}
                  style={styleObj}
                  onClick={() => {
                    setSelectedArmorListJob(
                      selectedArmorList.filter(item =>
                        item.requiredJobs.includes("Magician")
                      )
                    )
                    setSelectedArmorJob("Magician")
                    setSelectedArmor(null)
                  }}
                >
                  마법사
                </Button>
                <Button
                  variant={selectedArmorJob === "Thief" ? "primary" : "dark"}
                  style={styleObj}
                  onClick={() => {
                    setSelectedArmorListJob(
                      selectedArmorList.filter(item =>
                        item.requiredJobs.includes("Thief")
                      )
                    )
                    setSelectedArmorJob("Thief")
                    setSelectedArmor(null)
                  }}
                >
                  도적
                </Button>
                <Button
                  variant={selectedArmorJob === "Pirate" ? "primary" : "dark"}
                  style={styleObj}
                  onClick={() => {
                    setSelectedArmorListJob(
                      selectedArmorList.filter(item =>
                        item.requiredJobs.includes("Pirate")
                      )
                    )
                    setSelectedArmorJob("Pirate")
                    setSelectedArmor(null)
                  }}
                >
                  해적
                </Button>
              </Row>
            )}
            &nbsp;
            <Row>
              <Form.Control
                placeholder={`방어구 검색 키워드`}
                style={{ width: "180px" }}
                value={armorSearch}
                onChange={e => {
                  setArmorSearch(e.target.value)
                }}
              />
              <Dropdown
                onSelect={eventKey => {
                  setArmorSearch("")
                  setSelectedArmor(
                    selectedArmorList.find(
                      ({ id }) => id.toString() === eventKey
                    )
                  )
                  setArmorStarforceNumber(0)
                  setArmorEnforceNumber(1)
                  setArmorFirstStats(0)
                  setArmorSecondStats(0)
                }}
              >
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{ width: "150px" }}
                >
                  방어구 목록
                </Dropdown.Toggle>
                <Dropdown.Menu className="context">
                  {selectedArmorListJob
                    ?.filter(item => item?.name?.includes(armorSearch))
                    ?.map(parts => (
                      <Dropdown.Item
                        style={{ width: "270px" }}
                        eventKey={parts.id}
                        event={parts}
                      >
                        <Figure.Image
                          width={20}
                          height={10}
                          src={`https://maplestory.io/api/${REGION}/${VERSION}/item/${parts.id}/icon`}
                        />
                        &nbsp; &nbsp;
                        {parts.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            {!selectedArmor && (
              <Row>
                &nbsp;
                <div>
                  <p style={{ color: "red" }}>
                    주흔 작 상태를 확인할 방어구를 선택해주세요.
                  </p>
                </div>
              </Row>
            )}
            <Row>
              <Col
                style={{
                  display: "flex",
                  "align-items": "center",
                  "max-width": "50%",
                  "justify-content": "center",
                }}
              >
                <div>
                  {selectedArmor && (
                    <div style={{ "text-align": "center" }}>
                      <Row className="justify-content-center">
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            "line-height": "50px",
                            border: "2px solid black",
                            padding: "10px",
                            "border-radius": "6px",
                            display: "flex",
                            "justify-content": "center",
                            "align-items": "center",
                          }}
                        >
                          <Figure.Image
                            style={{
                              margin: 0,
                              "max-width": "100%",
                              "max-height": "100%",
                            }}
                            margin={0}
                            width={70}
                            src={`https://maplestory.io/api/${REGION}/${VERSION}/item/${selectedArmor?.id}/icon`}
                          />
                        </div>
                      </Row>
                      &nbsp;
                      <Row className="justify-content-center">
                        선택된 방어구: {selectedArmor.name}
                        <br /> 착용 레벨: {selectedArmor.requiredLevel}
                        <br /> 착용 가능 직업:{" "}
                        {selectedArmor.requiredJobs
                          .map(job => jobMap[job])
                          .join(", ")}
                      </Row>
                    </div>
                  )}
                </div>
              </Col>
              <Col className="col-lg-6">
                <Row>&nbsp;</Row>
                {selectedArmor && (
                  <div>
                    <Row>
                      <Col
                        style={{
                          display: "flex",
                          "align-items": "center",
                          "justify-content": "center",
                        }}
                      >
                        <Figure>
                          <Figure.Image
                            style={{
                              "border-radius": "10px",
                              width: "250px",
                            }}
                            src={
                              selectedArmor?.typeInfo.subCategory === "Glove"
                                ? bossGloveStarforceEnforce
                                : bossArmorStarforceEnforce
                            }
                          />
                          <Figure.Caption style={{ "text-align": "center" }}>
                            {selectedArmor?.typeInfo.subCategory === "Glove" &&
                              '푸른색 상자 속 별 수: "스타포스"'}
                            <br />
                            푸른색 상자 속 숫자: "작 된 횟수"
                          </Figure.Caption>
                        </Figure>
                      </Col>
                      <Col>
                        <Figure>
                          <Figure.Image
                            style={{
                              "border-radius": "10px",
                              width: "200px",
                            }}
                            src={
                              selectedArmor?.typeInfo.subCategory === "Glove"
                                ? bossGloveStats
                                : bossArmorStats
                            }
                          />
                          <Figure.Caption style={{ "text-align": "center" }}>
                            붉은색 상자 속 숫자: "증가 능력치"
                          </Figure.Caption>
                        </Figure>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      {selectedArmor?.typeInfo.subCategory === "Glove" &&
                        '"스타포스 별 수"와 '}
                      "작된 횟수"와 "증가한 능력치"를 위 그림의 푸른색 상자와
                      붉은색 상자 내부의 수치를 참고하여 적어주세요.
                    </Row>
                    <br />
                    {selectedArmor?.typeInfo.subCategory === "Glove" && (
                      <div>
                        <Row>
                          <Form.Control
                            plaintext
                            style={{ width: "70px" }}
                            value="스타포스"
                          />
                          <Form.Control
                            type="number"
                            min={0}
                            placeholder={`스타포스 별 개수`}
                            style={{ width: "180px", "margin-bottom": "2px" }}
                            value={armorStarforceNumber}
                            onChange={e => {
                              setArmorStarforceNumber(e.target.value)
                            }}
                          />
                        </Row>
                      </div>
                    )}
                    <Row>
                      <Form.Control
                        plaintext
                        style={{ width: "70px" }}
                        value="작 횟수"
                      />
                      <Form.Control
                        type="number"
                        min={1}
                        placeholder={`주문서 작 횟수`}
                        style={{ width: "180px", "margin-bottom": "2px" }}
                        value={armorEnforceNumber}
                        onChange={e => {
                          setArmorEnforceNumber(e.target.value)
                        }}
                      />
                    </Row>
                    {selectedArmor?.typeInfo.subCategory === "Glove" && (
                      <Row>
                        <Form.Control
                          plaintext
                          style={{ width: "70px" }}
                          value={
                            selectedArmor.requiredJobs[0] === "Magician"
                              ? "마력"
                              : "공격력"
                          }
                        />
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder={`${
                            selectedArmor.requiredJobs[0] === "Magician"
                              ? "마력"
                              : "공격력"
                          } 증가 수치`}
                          style={{ width: "180px", "margin-bottom": "2px" }}
                          value={armorAttackPower}
                          onChange={e => {
                            setArmorAttackPower(e.target.value)
                          }}
                        />
                      </Row>
                    )}
                    {selectedArmor?.typeInfo.subCategory !== "Glove" &&
                      jobToStatMap[selectedArmor.requiredJobs[0]].map(
                        (stat, index) => (
                          <div>
                            <Row>
                              <Form.Control
                                plaintext
                                style={{ width: "70px" }}
                                value={stat}
                              />
                              <Form.Control
                                type="number"
                                min={0}
                                placeholder={`증가한 ${stat} 수치`}
                                style={{
                                  width: "180px",
                                  "margin-bottom": "2px",
                                }}
                                value={
                                  index === 0 ? weaponMainStats : weaponSubStats
                                }
                                onChange={e => {
                                  if (index === 0) {
                                    setArmorFirstStats(e.target.value)
                                  } else {
                                    setArmorSecondStats(e.target.value)
                                  }
                                }}
                              />
                            </Row>
                          </div>
                        )
                      )}
                    <br />
                    <Row>
                      <Button
                        variant="dark"
                        style={styleObj}
                        onClick={() => {
                          if (selectedArmor?.typeInfo.subCategory === "Glove") {
                            const additionalAttackPower = {
                              0: 0,
                              1: 0,
                              2: 0,
                              3: 0,
                              4: 0,
                              5: 1,
                              6: 1,
                              7: 2,
                              8: 2,
                              9: 3,
                              10: 3,
                              11: 4,
                              12: 4,
                              13: 5,
                              14: 6,
                              15: 7,
                              16: 17,
                              17: 28,
                              18: 40,
                              19: 53,
                              20: 67,
                              21: 82,
                              22: 99,
                              23: 120,
                            }
                            const attackPowerBySpellTraces =
                              armorAttackPower -
                              additionalAttackPower[armorStarforceNumber]
                            const x = parseInt(
                              attackPowerBySpellTraces / armorEnforceNumber
                            )
                            const y =
                              attackPowerBySpellTraces % armorEnforceNumber
                            const z = [100, 70, 30]
                            if (
                              weaponEnforceNumber < 0 ||
                              (x === 4 && y !== 0) ||
                              x < 1 ||
                              x > 3 ||
                              (x > 0 &&
                                x < 3 &&
                                (y < 0 || y > armorEnforceNumber - 1))
                            ) {
                              setArmorResult(
                                `잘못된 입력입니다! 주문의 흔적을 사용한 강화가 아닐 수 있습니다.`
                              )
                            } else if (y === 0) {
                              setArmorResult(
                                `${z[x - 1]}% 주문서 ${armorEnforceNumber}장`
                              )
                            } else {
                              setArmorResult(
                                `${z[x - 1]}% 주문서 ${armorEnforceNumber -
                                  y}장, ${z[x]}% 주문서 ${y}장`
                              )
                            }
                          } else {
                            const mainStats = Math.max(
                              armorFirstStats,
                              aromorSecondStats
                            )
                            const subStats = Math.min(
                              armorFirstStats,
                              aromorSecondStats
                            )
                            let x = 0
                            let y = 0
                            let z = 0
                            while (z <= armorEnforceNumber) {
                              y =
                                mainStats -
                                subStats -
                                3 * armorEnforceNumber -
                                4 * z
                              x =
                                4 * armorEnforceNumber -
                                (mainStats - subStats) +
                                3 * z
                              if (x >= 0 && x <= 8 && y >= 0 && y <= 8) {
                                break
                              }
                              z += 1
                            }
                            if (z !== armorEnforceNumber * 1 + 1) {
                              const result = [
                                { species: 100, number: x },
                                { species: 70, number: y },
                                { species: 30, number: z },
                              ]
                                .filter(({ number }) => number !== 0)
                                .map(
                                  ({ species, number }) =>
                                    `${species}% 주문서 ${number} 장`
                                )
                                .join(", ")
                              setArmorResult(result)
                            } else {
                              setArmorResult(
                                `잘못된 입력입니다! 주문의 흔적을 사용한 강화가 아닐 수 있습니다.`
                              )
                            }
                          }
                        }}
                      >
                        작 상태 계산하기
                      </Button>
                      {armorResult && (
                        <Form.Control
                          plaintext
                          style={{ width: "450px", color: "red" }}
                          value={`${armorResult}`}
                        />
                      )}
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        )}
        {!selectedCategory && (
          <div>
            <Row>&nbsp;</Row>
            <Row>
              <h1>주흔 작 상태란?</h1>
            </Row>
            <Row>&nbsp;</Row>
            <Row>
              <Col className="col-lg-6" style={{ padding: 0 }}>
                <Figure.Image
                  style={{ "border-radius": "10px" }}
                  // width={20}
                  // height={10}
                  src={spellTracesExplanation}
                />
              </Col>
              <Col className="col-lg-6">
                <p> &bull; "주문의 흔적 작 상태"의 줄임말</p>
                <p>
                  &bull; 주문의 흔적을 사용하여 아이템을 강화하면{" "}
                  <b>주문서 사용 가능 횟수를 1회 소모하고</b> 아이템의 능력치가
                  오르게 됨.
                </p>
                <p>
                  &bull; 100%, 70%, 30%, 15% 확률의 강화가 존재하고 힘(STR),
                  민첩(DEX), 지력(INT), 운(LUK), 체력(HP)의{" "}
                  <b>능력치를 올릴 수 있음</b>.
                </p>
                <p>
                  &bull;{" "}
                  <b>
                    아이템에 사용한 주문서 사용 가능횟수로 올라간 능력치의 최종
                    상태
                  </b>
                  를 주흔 작 상태라고 칭함.
                </p>
                <p>
                  &bull; 주흔 작 상태 계산기는 아이템 능력치의 최종 상태를
                  바탕으로 <b>어떤 확률</b>의 <b>어떤 능력치를 올려주는</b>{" "}
                  주문서로 <b>몇 번 </b>
                  강화를 성공했는지 알려주는 계산기.
                </p>
              </Col>
            </Row>
            &nbsp;
            <Row className="justify-content-center">
              <p>
                사용하시려면 본 페이지 상단에서 주흔 작 상태를 알아보고자 하는
                아이템의 종류를 클릭하세요!
              </p>
              <p>
                ex) 앱솔랩스 스펠링스태프 &rarr; 보스 무기, 이글아이 던위치로브
                &rarr; 보스 방어구, 매커네이터 펜던트 &rarr; 보스 장신구
              </p>
              <p style={{ color: "red" }}>
                주의) 현재 제논, 데몬어벤져는 지원하지 않습니다. 추후 추가
                예정입니다.
              </p>
              <p style={{ color: "red" }}>
                주의) 현재 주스탯 작이 아닌 무기 작은 지원하지 않습니다. (ex.
                단검에 공격력(힘)작을 진행한 경우)
              </p>
            </Row>
          </div>
        )}

        {/* </Col>
          <Col
            className="col-lg-2"
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              "max-width": "50%",
            }}
          ></Col>
        </Row> */}
      </Container>
    </Layout>
  )
}

export default React.memo(SpellTracesCalculator)
