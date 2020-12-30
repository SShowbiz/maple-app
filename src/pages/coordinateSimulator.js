import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { Row, Col, Container, Figure, Button } from "react-bootstrap"
import download from "downloadjs"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CoordinateParts from "../components/coordinateParts"
import ColorSelect from "../components/colorSelect"

const VERSION = "340"
const REGION = "KMS"

const CoordinateSimulator = () => {
  const [hairData, setHairData] = useState(null)
  const [faceData, setFaceData] = useState(null)
  const [skinData, setSkinData] = useState(null)
  const [faceAccessoryData, setFaceAccessoryData] = useState(null)
  const [eyeDecorationData, setEyeDecorationData] = useState(null)
  const [hatData, setHatData] = useState(null)
  const [overallData, setOverallData] = useState(null)
  const [topData, setTopData] = useState(null)
  const [bottomData, setBottomData] = useState(null)
  const [shoesData, setShoesData] = useState(null)
  const [capeData, setCapeData] = useState(null)
  const [weaponData, setWeaponData] = useState(null)

  const [hairSearch, setHairSearch] = useState("")
  const [faceSearch, setFaceSearch] = useState("")
  const [skinSearch, setSkinSearch] = useState("")
  const [faceAccessorySearch, setFaceAccessorySearch] = useState("")
  const [eyeDecorationSearch, setEyeDecorationSearch] = useState("")
  const [hatSearch, setHatSearch] = useState("")
  const [overallSearch, setOverallSearch] = useState("")
  const [topSearch, setTopSearch] = useState("")
  const [bottomSearch, setBottomSearch] = useState("")
  const [shoesSearch, setShoesSearch] = useState("")
  const [capeSearch, setCapeSearch] = useState("")
  const [weaponSearch, setWeaponSearch] = useState("")

  const [selectedHair, setSelectedHair] = useState(null)
  const [selectedFace, setSelectedFace] = useState(null)
  const [selectedSkin, setSelectedSkin] = useState({
    id: "12000",
    name: "크림 피부",
  })
  const [selectedFaceAccessory, setSelectedFaceAccessory] = useState(null)
  const [selectedEyeDecoration, setSelectedEyeDecoration] = useState(null)
  const [selectedHat, setSelectedHat] = useState(null)
  const [selectedOverall, setSelectedOverall] = useState(null)
  const [selectedTop, setSelectedTop] = useState(null)
  const [selectedBottom, setSelectedBottom] = useState(null)
  const [selectedShoes, setSelectedShoes] = useState(null)
  const [selectedCape, setSelectedCape] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)

  const [hairBaseColor, setHairBaseColor] = useState(null)
  const [hairMixColor, setHairMixColor] = useState(null)

  const [faceBaseColor, setFaceBaseColor] = useState(null)
  const [faceMixColor, setFaceMixColor] = useState(null)

  const changeToList = (data, search) => {
    if (!data) return []
    return Object.keys(data)
      .filter(key => key?.includes(search))
      .map(selectedKey => ({
        id: data[selectedKey],
        name: selectedKey,
      }))
  }
  const hairList = useMemo(() => {
    return changeToList(hairData, hairSearch)
  }, [hairData, hairSearch])
  const faceList = useMemo(() => {
    return changeToList(faceData, faceSearch)
  }, [faceData, faceSearch])
  const skinList = useMemo(() => {
    return changeToList(skinData, skinSearch)
  }, [skinData, skinSearch])
  const faceAccessoryList = useMemo(() => {
    return changeToList(faceAccessoryData, faceAccessorySearch)
  }, [faceAccessoryData, faceAccessorySearch])
  const eyeDecorationList = useMemo(() => {
    return changeToList(eyeDecorationData, eyeDecorationSearch)
  }, [eyeDecorationData, eyeDecorationSearch])
  const hatList = useMemo(() => {
    return changeToList(hatData, hatSearch)
  }, [hatData, hatSearch])
  const overallList = useMemo(() => {
    return changeToList(overallData, overallSearch)
  }, [overallData, overallSearch])
  const topList = useMemo(() => {
    return changeToList(topData, topSearch)
  }, [topData, topSearch])
  const bottomList = useMemo(() => {
    return changeToList(bottomData, bottomSearch)
  }, [bottomData, bottomSearch])
  const shoesList = useMemo(() => {
    return changeToList(shoesData, shoesSearch)
  }, [shoesData, shoesSearch])
  const capeList = useMemo(() => {
    return changeToList(capeData, capeSearch)
  }, [capeData, capeSearch])
  const weaponList = useMemo(() => {
    return changeToList(weaponData, weaponSearch)
  }, [weaponData, weaponSearch])

  const skinUri = encodeURIComponent(
    '{"itemId":' +
      (selectedSkin.id % 10000) +
      ',"version":"' +
      VERSION +
      '","region":"' +
      REGION +
      '"},{"itemId":' +
      selectedSkin.id +
      ',"version":"' +
      VERSION +
      '","region":"' +
      REGION +
      '"}'
  )
  const changeToUri = id => {
    return (
      ',{"itemId":' +
      id +
      ',"version":"' +
      VERSION +
      '","region":"' +
      REGION +
      '"}'
    )
  }

  const hairColorMap = {
    black: 0,
    red: 1,
    orange: 2,
    yellow: 3,
    green: 4,
    blue: 5,
    purple: 6,
    brown: 7,
  }

  const faceColorMap = {
    black: 0,
    blue: 1,
    red: 2,
    green: 3,
    brown: 4,
    emerald: 5,
    purple: 6,
    amethyst: 7,
  }

  const hairBaseUri =
    selectedHair && hairBaseColor
      ? changeToUri(selectedHair.id + hairColorMap[hairBaseColor])
      : ""
  const hairMixUri =
    selectedHair && hairMixColor
      ? changeToUri(selectedHair.id + hairColorMap[hairMixColor])
      : ""
  const faceBaseUri =
    selectedFace && faceBaseColor
      ? changeToUri(selectedFace.id + faceColorMap[faceBaseColor] * 100)
      : ""
  const faceMixUri =
    selectedFace && faceMixColor
      ? changeToUri(selectedFace.id + faceColorMap[faceMixColor] * 100)
      : ""
  const faceAccessoryUri = selectedFaceAccessory
    ? changeToUri(selectedFaceAccessory.id)
    : ""
  const eyeDecorationUri = selectedEyeDecoration
    ? changeToUri(selectedEyeDecoration.id)
    : ""
  const hatUri = selectedHat ? changeToUri(selectedHat.id) : ""
  const overallUri = selectedOverall ? changeToUri(selectedOverall.id) : ""
  const topUri = selectedTop ? changeToUri(selectedTop.id) : ""
  const bottomUri = selectedBottom ? changeToUri(selectedBottom.id) : ""
  const shoesUri = selectedShoes ? changeToUri(selectedShoes.id) : ""
  const capeUri = selectedCape ? changeToUri(selectedCape.id) : ""
  const weaponUri = selectedWeapon ? changeToUri(selectedWeapon.id) : ""

  const imageBaseUri =
    "https://maplestory.io/api/Character/" +
    skinUri +
    encodeURIComponent(
      hairBaseUri +
        faceBaseUri +
        faceAccessoryUri +
        eyeDecorationUri +
        hatUri +
        overallUri +
        topUri +
        bottomUri +
        shoesUri +
        capeUri +
        weaponUri
    ) +
    "/" +
    "stand1" +
    "/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0"

  const imageMixUri =
    "https://maplestory.io/api/Character/" +
    skinUri +
    encodeURIComponent(
      hairMixUri +
        faceMixUri +
        faceAccessoryUri +
        eyeDecorationUri +
        hatUri +
        overallUri +
        topUri +
        bottomUri +
        shoesUri +
        capeUri +
        weaponUri
    ) +
    "/" +
    "stand1" +
    "/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0"

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://maplestory.io/api/KMS/340/item/category/equip"
    )
    const hairObj = {}
    const faceObj = {}
    const skinObj = {}
    const faceAccessoryObj = {}
    const eyeDecorationObj = {}
    const hatObj = {}
    const overallObj = {}
    const topObj = {}
    const bottomObj = {}
    const shoesObj = {}
    const capeObj = {}
    const weaponObj = {}

    data.forEach(item => {
      if (
        item.typeInfo.subCategory === "Hair" &&
        item.name.includes("검은색") &&
        !hairObj[item.name]
      ) {
        hairObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Face" && !faceObj[item.name]) {
        faceObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Head" && !skinObj[item.name]) {
        skinObj[item.name] = item.id
      }
      if (
        item.typeInfo.subCategory === "Face Accessory" &&
        !faceAccessoryObj[item.name]
      ) {
        faceAccessoryObj[item.name] = item.id
      }
      if (
        item.typeInfo.subCategory === "Eye Decoration" &&
        !eyeDecorationObj[item.name]
      ) {
        eyeDecorationObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Hat" && !hatObj[item.name]) {
        hatObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Overall" && !overallObj[item.name]) {
        overallObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Top" && !topObj[item.name]) {
        topObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Bottom" && !bottomObj[item.name]) {
        bottomObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Shoes" && !shoesObj[item.name]) {
        shoesObj[item.name] = item.id
      }
      if (item.typeInfo.subCategory === "Cape" && !capeObj[item.name]) {
        capeObj[item.name] = item.id
      }
      if (item.typeInfo.category.includes("Weapon") && !weaponObj[item.name]) {
        weaponObj[item.name] = item.id
      }
    })
    setHairData(hairObj)
    setFaceData(faceObj)
    setSkinData(skinObj)
    setFaceAccessoryData(faceAccessoryObj)
    setEyeDecorationData(eyeDecorationObj)
    setHatData(hatObj)
    setOverallData(overallObj)
    setTopData(topObj)
    setBottomData(bottomObj)
    setShoesData(shoesObj)
    setCapeData(capeObj)
    setWeaponData(weaponObj)
  }

  const forceDownload = url => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.onload = function() {
      const downloadUrl = "maple-character-image.jpg"
      download(xhr.response, downloadUrl, xhr.response.type)
    }
    xhr.send()
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedHair) {
      setHairBaseColor("black")
      setHairMixColor("black")
    }
  }, [selectedHair])

  useEffect(() => {
    if (selectedFace) {
      setFaceBaseColor("black")
      setFaceMixColor("black")
    }
  }, [selectedFace])

  const defaultOptions = {
    format: "image/png",
    quality: 0.92,
    width: undefined,
    height: undefined,
    Canvas: undefined,
  }

  const mergeImages = function(sources, options) {
    if (sources === void 0) sources = []
    if (options === void 0) options = {}
    return new Promise(function(resolve) {
      options = Object.assign({}, defaultOptions, options)
      var canvas = options.Canvas
        ? new options.Canvas()
        : window.document.createElement("canvas")
      var Image = options.Canvas ? options.Canvas.Image : window.Image
      if (options.Canvas) {
        options.quality *= 100
      }
      var images = sources.map(function(source) {
        return new Promise(function(resolve, reject) {
          if (source.constructor.name !== "Object") {
            source = { src: source }
          }
          var img = new Image()
          img.crossOrigin = "Anonymous"
          img.onerror = function() {
            return reject(new Error("Couldn't load image"))
          }
          img.onload = function() {
            return resolve(Object.assign({}, source, { img: img }))
          }
          img.src = source.src
        })
      })
      var ctx = canvas.getContext("2d")
      resolve(
        Promise.all(images).then(function(images) {
          var getSize = function(dim) {
            return (
              options[dim] ||
              Math.max.apply(
                Math,
                images.map(function(image) {
                  return image.img[dim]
                })
              )
            )
          }
          canvas.width = getSize("width")
          canvas.height = getSize("height")

          images.forEach(function(image) {
            ctx.globalAlpha = image.opacity ? image.opacity : 1
            return ctx.drawImage(image.img, image.x || 0, image.y || 0)
          })

          if (options.Canvas && options.format === "image/jpeg") {
            return new Promise(function(resolve) {
              canvas.toDataURL(
                options.format,
                {
                  quality: options.quality,
                  progressive: false,
                },
                function(err, jpeg) {
                  if (err) {
                    throw err
                  }
                  resolve(jpeg)
                }
              )
            })
          }

          return canvas.toDataURL(options.format, options.quality)
        })
      )
    })
  }
  const [imageUri, setImageUri] = useState(imageBaseUri)

  useEffect(() => {
    mergeImages([
      { src: imageBaseUri },
      { src: imageMixUri, opacity: 0.5 },
    ]).then(b64 => {
      setImageUri(b64)
    })
  }, [imageBaseUri, imageMixUri, mergeImages])

  return (
    <Layout pageInfo={{ pageName: "page-2" }}>
      <SEO title="Page two" />
      <Container
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          "overflow-y": "auto",
        }}
      >
        <Row>
          <Col className="col-lg-10">
            <CoordinateParts
              partsName="피부"
              searchKeyWord={skinSearch}
              setSearchWord={setSkinSearch}
              selectedParts={selectedSkin}
              setSelectedParts={setSelectedSkin}
              partsData={skinData}
              partsList={skinList}
            />
            <CoordinateParts
              partsName="헤어"
              searchKeyWord={hairSearch}
              setSearchWord={setHairSearch}
              selectedParts={selectedHair}
              setSelectedParts={setSelectedHair}
              partsData={hairData}
              partsList={hairList}
            />
            <ColorSelect
              colorList={[
                { colorCode: "#dc143c", color: "red" },
                { colorCode: "#fe9661", color: "orange" },
                { colorCode: "#ffcf19", color: "yellow" },
                { colorCode: "#8dd28d", color: "green" },
                { colorCode: "#14a4f2", color: "blue" },
                { colorCode: "#794eb9", color: "purple" },
                { colorCode: "#323232", color: "black" },
                { colorCode: "#a4715d", color: "brown" },
              ]}
              baseColor={hairBaseColor}
              setBaseColor={setHairBaseColor}
              mixColor={hairMixColor}
              setMixColor={setHairMixColor}
            />
            <CoordinateParts
              partsName="성형"
              searchKeyWord={faceSearch}
              setSearchWord={setFaceSearch}
              selectedParts={selectedFace}
              setSelectedParts={setSelectedFace}
              partsData={faceData}
              partsList={faceList}
            />
            <ColorSelect
              colorList={[
                { colorCode: "#dc143c", color: "red" },
                { colorCode: "#8dd28d", color: "green" },
                { colorCode: "#2ad3f3", color: "emerald" },
                { colorCode: "#14a4f2", color: "blue" },
                { colorCode: "#794eb9", color: "purple" },
                { colorCode: "#de26dd", color: "amethyst" },
                { colorCode: "#323232", color: "black" },
                { colorCode: "#a4715d", color: "brown" },
              ]}
              baseColor={faceBaseColor}
              setBaseColor={setFaceBaseColor}
              mixColor={faceMixColor}
              setMixColor={setFaceMixColor}
            />
            <CoordinateParts
              partsName="얼굴 장식"
              searchKeyWord={faceAccessorySearch}
              setSearchWord={setFaceAccessorySearch}
              selectedParts={selectedFaceAccessory}
              setSelectedParts={setSelectedFaceAccessory}
              partsData={faceAccessoryData}
              partsList={faceAccessoryList}
            />
            <CoordinateParts
              partsName="눈 장식"
              searchKeyWord={eyeDecorationSearch}
              setSearchWord={setEyeDecorationSearch}
              selectedParts={selectedEyeDecoration}
              setSelectedParts={setSelectedEyeDecoration}
              partsData={eyeDecorationData}
              partsList={eyeDecorationList}
            />
            <CoordinateParts
              partsName="모자"
              searchKeyWord={hatSearch}
              setSearchWord={setHatSearch}
              selectedParts={selectedHat}
              setSelectedParts={setSelectedHat}
              partsData={hatData}
              partsList={hatList}
            />
            <CoordinateParts
              partsName="한벌 옷"
              searchKeyWord={overallSearch}
              setSearchWord={setOverallSearch}
              selectedParts={selectedOverall}
              setSelectedParts={part => {
                setSelectedOverall(part)
                setSelectedTop(null)
                setSelectedBottom(null)
              }}
              partsData={overallData}
              partsList={overallList}
            />
            <CoordinateParts
              partsName="상의"
              searchKeyWord={topSearch}
              setSearchWord={setTopSearch}
              selectedParts={selectedTop}
              setSelectedParts={part => {
                setSelectedTop(part)
                setSelectedOverall(null)
              }}
              partsData={topData}
              partsList={topList}
            />
            <CoordinateParts
              partsName="하의"
              searchKeyWord={bottomSearch}
              setSearchWord={setBottomSearch}
              selectedParts={selectedBottom}
              setSelectedParts={part => {
                setSelectedBottom(part)
                setSelectedOverall(null)
              }}
              partsData={bottomData}
              partsList={bottomList}
            />
            <CoordinateParts
              partsName="신발"
              searchKeyWord={shoesSearch}
              setSearchWord={setShoesSearch}
              selectedParts={selectedShoes}
              setSelectedParts={setSelectedShoes}
              partsData={shoesData}
              partsList={shoesList}
            />
            <CoordinateParts
              partsName="망토"
              searchKeyWord={capeSearch}
              setSearchWord={setCapeSearch}
              selectedParts={selectedCape}
              setSelectedParts={setSelectedCape}
              partsData={capeData}
              partsList={capeList}
            />
            <CoordinateParts
              partsName="무기"
              searchKeyWord={weaponSearch}
              setSearchWord={setWeaponSearch}
              selectedParts={selectedWeapon}
              setSelectedParts={setSelectedWeapon}
              partsData={weaponData}
              partsList={weaponList}
            />
          </Col>
          <Col
            className="col-lg-2"
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              "max-width": "50%",
            }}
          >
            <div>
              <Row className="justify-content-center">
                <Figure.Image src={imageUri} />
                {/* <Figure.Image
                  src={imageMixUri}
                  style={{ opacity: 0.3333, position: "absolute" }}
                /> */}
              </Row>
              <Row className="justify-content-center">
                <Button
                  variant="primary"
                  onClick={() => forceDownload(imageBaseUri)}
                >
                  다운로드
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default CoordinateSimulator
