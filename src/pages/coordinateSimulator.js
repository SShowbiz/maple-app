import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react"
import axios from "axios"
import {
  Row,
  Col,
  Container,
  Figure,
  Button,
  Form,
  Spinner,
} from "react-bootstrap"
import download from "downloadjs"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CoordinateParts from "../components/coordinateParts"
import ColorSelect from "../components/colorSelect"
import MixRatio from "../components/mixRatio"

const VERSION = "342"
const REGION = "KMS"

const CoordinateSimulator = () => {
  const SuspenseImg = ({ src, ...rest }) => {
    imgCache.read(src)
    return <img src={src} {...rest} alt={<div></div>} />
  }

  const imgCache = {
    __cache: {},
    read(src) {
      if (!this.__cache[src]) {
        this.__cache[src] = new Promise(resolve => {
          const img = new Image()
          img.onload = () => {
            this.__cache[src] = true
            resolve(this.__cache[src])
          }
          img.src = src
        }).then(img => {
          this.__cache[src] = true
        })
      }
      if (this.__cache[src] instanceof Promise) {
        throw this.__cache[src]
      }
      return this.__cache[src]
    },
  }

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

  const [hairBaseColor, setHairBaseColor] = useState("black")
  const [hairMixColor, setHairMixColor] = useState("black")

  const [faceBaseColor, setFaceBaseColor] = useState("black")
  const [faceMixColor, setFaceMixColor] = useState("black")

  const [hairMixValue, setHairMixValue] = useState(50)
  const [faceMixValue, setFaceMixValue] = useState(50)

  const [action, setAction] = useState("stand1")
  const [isAnimated, setIsAnimated] = useState(false)

  const disabledColorHairList = ["올빽 머리", "닭 머리"]

  const hairColorDisabled = useMemo(() => {
    if (disabledColorHairList.includes(selectedHair?.name)) return true
    return false
  }, [selectedHair, disabledColorHairList])

  const changeToList = useCallback((data, search) => {
    if (!data) return []
    if (search === "") {
      return Object.keys(data).map(selectedKey => data[selectedKey])
    }
    return Object.keys(data)
      .filter(key => key?.includes(search))
      .map(selectedKey => data[selectedKey])
  }, [])

  const changeToSearchList = useCallback((data, searchWord) => {
    if (searchWord === "") return data
    return data ? data.filter(({ name }) => name?.includes(searchWord)) : []
  }, [])

  const hairList = useMemo(() => {
    return changeToSearchList(hairData, hairSearch)
  }, [hairData, hairSearch, changeToSearchList])

  const faceList = useMemo(() => {
    return changeToSearchList(faceData, faceSearch)
  }, [faceData, faceSearch, changeToSearchList])

  const skinList = useMemo(() => {
    return changeToSearchList(skinData, skinSearch)
  }, [skinData, skinSearch, changeToSearchList])

  const faceAccessoryList = useMemo(() => {
    return changeToSearchList(faceAccessoryData, faceAccessorySearch)
  }, [faceAccessoryData, faceAccessorySearch, changeToSearchList])

  const eyeDecorationList = useMemo(() => {
    return changeToSearchList(eyeDecorationData, eyeDecorationSearch)
  }, [eyeDecorationData, eyeDecorationSearch, changeToSearchList])

  const hatList = useMemo(() => {
    return changeToSearchList(hatData, hatSearch)
  }, [hatData, hatSearch, changeToSearchList])

  const overallList = useMemo(() => {
    return changeToSearchList(overallData, overallSearch)
  }, [overallData, overallSearch, changeToSearchList])

  const topList = useMemo(() => {
    return changeToSearchList(topData, topSearch)
  }, [topData, topSearch, changeToSearchList])

  const bottomList = useMemo(() => {
    return changeToSearchList(bottomData, bottomSearch)
  }, [bottomData, bottomSearch, changeToSearchList])

  const shoesList = useMemo(() => {
    return changeToSearchList(shoesData, shoesSearch)
  }, [shoesData, shoesSearch, changeToSearchList])

  const capeList = useMemo(() => {
    return changeToSearchList(capeData, capeSearch)
  }, [capeData, capeSearch, changeToSearchList])

  const weaponList = useMemo(() => {
    return changeToSearchList(weaponData, weaponSearch)
  }, [weaponData, weaponSearch, changeToSearchList])

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

  const needToAddAdditionalWeapon =
    selectedWeapon?.typeInfo.subCategory === "Cash" &&
    (action === "stand2" || action === "walk2" || action === "swingP1")

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
  const additionalWeaponUri = needToAddAdditionalWeapon
    ? changeToUri(1432009)
    : ""

  const imageHairBaseFaceBaseUri = useMemo(() => {
    return (
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
          weaponUri +
          additionalWeaponUri
      ) +
      "/" +
      action +
      `/${
        isAnimated ? "animated?" : "0"
      }?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0`
    )
  }, [
    action,
    skinUri,
    hairBaseUri,
    faceBaseUri,
    faceAccessoryUri,
    eyeDecorationUri,
    hatUri,
    overallUri,
    topUri,
    bottomUri,
    shoesUri,
    capeUri,
    weaponUri,
    additionalWeaponUri,
    isAnimated,
  ])

  const imageHairMixFaceBaseUri = useMemo(() => {
    return (
      "https://maplestory.io/api/Character/" +
      skinUri +
      encodeURIComponent(
        hairMixUri +
          faceBaseUri +
          faceAccessoryUri +
          eyeDecorationUri +
          hatUri +
          overallUri +
          topUri +
          bottomUri +
          shoesUri +
          capeUri +
          weaponUri +
          additionalWeaponUri
      ) +
      "/" +
      action +
      `/${
        isAnimated ? "animated?" : "0"
      }?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0`
    )
  }, [
    action,
    skinUri,
    hairMixUri,
    faceBaseUri,
    faceAccessoryUri,
    eyeDecorationUri,
    hatUri,
    overallUri,
    topUri,
    bottomUri,
    shoesUri,
    capeUri,
    weaponUri,
    additionalWeaponUri,
    isAnimated,
  ])

  const imageHairBaseFaceMixUri = useMemo(() => {
    return (
      "https://maplestory.io/api/Character/" +
      skinUri +
      encodeURIComponent(
        hairBaseUri +
          faceMixUri +
          faceAccessoryUri +
          eyeDecorationUri +
          hatUri +
          overallUri +
          topUri +
          bottomUri +
          shoesUri +
          capeUri +
          weaponUri +
          additionalWeaponUri
      ) +
      "/" +
      action +
      `/${
        isAnimated ? "animated?" : "0"
      }?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0`
    )
  }, [
    action,
    skinUri,
    hairBaseUri,
    faceMixUri,
    faceAccessoryUri,
    eyeDecorationUri,
    hatUri,
    overallUri,
    topUri,
    bottomUri,
    shoesUri,
    capeUri,
    weaponUri,
    additionalWeaponUri,
    isAnimated,
  ])

  const imageHairMixFaceMixUri = useMemo(() => {
    return (
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
          weaponUri +
          additionalWeaponUri
      ) +
      "/" +
      action +
      `/${
        isAnimated ? "animated?" : "0"
      }?showears=false&showLefEars=false&showHighLefEars=undefined&resize=2&name=&flipX=false&bgColor=0,0,0,0`
    )
  }, [
    action,
    skinUri,
    hairMixUri,
    faceMixUri,
    faceAccessoryUri,
    eyeDecorationUri,
    hatUri,
    overallUri,
    topUri,
    bottomUri,
    shoesUri,
    capeUri,
    weaponUri,
    additionalWeaponUri,
    isAnimated,
  ])

  const [imageUri, setImageUri] = useState(imageHairBaseFaceBaseUri)

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(
      `https://maplestory.io/api/${REGION}/${VERSION}/item/category/equip`
    )
    console.log(data.filter(item => item?.name === "죽창"))
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
        const newItemName = item.name.replace("검은색 ", "")
        hairObj[item.name] = { ...item, name: newItemName }
      }
      if (item.typeInfo.subCategory === "Face" && !faceObj[item.name]) {
        faceObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Head" && !skinObj[item.name]) {
        skinObj[item.name] = item
      }
      if (
        item.typeInfo.subCategory === "Face Accessory" &&
        !faceAccessoryObj[item.name]
      ) {
        faceAccessoryObj[item.name] = item
      }
      if (
        item.typeInfo.subCategory === "Eye Decoration" &&
        !eyeDecorationObj[item.name]
      ) {
        eyeDecorationObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Hat" && !hatObj[item.name]) {
        hatObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Overall" && !overallObj[item.name]) {
        overallObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Top" && !topObj[item.name]) {
        topObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Bottom" && !bottomObj[item.name]) {
        bottomObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Shoes" && !shoesObj[item.name]) {
        shoesObj[item.name] = item
      }
      if (item.typeInfo.subCategory === "Cape" && !capeObj[item.name]) {
        capeObj[item.name] = item
      }
      if (item.typeInfo.category.includes("Weapon") && !weaponObj[item.name]) {
        weaponObj[item.name] = item
      }
    })
    setHairData(changeToList(hairObj, ""))
    setFaceData(changeToList(faceObj, ""))
    setSkinData(changeToList(skinObj, ""))
    setFaceAccessoryData(changeToList(faceAccessoryObj, ""))
    setEyeDecorationData(changeToList(eyeDecorationObj, ""))
    setHatData(changeToList(hatObj, ""))
    setOverallData(changeToList(overallObj, ""))
    setTopData(changeToList(topObj, ""))
    setBottomData(changeToList(bottomObj, ""))
    setShoesData(changeToList(shoesObj, ""))
    setCapeData(changeToList(capeObj, ""))
    setWeaponData(changeToList(weaponObj, ""))
  }, [changeToList])

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
  }, [fetchData])

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

  const mergeImages = useCallback(
    (sources, options) => {
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
    },
    [defaultOptions]
  )
  const visualizationMode = useMemo(() => {
    const hairMixVal = hairMixValue * 1
    const faceMixVal = faceMixValue * 1
    if (hairMixVal < 1 && faceMixVal > 0) {
      return 1
    } else if (hairMixVal > 0 && faceMixVal < 1) {
      return 2
    } else if (hairMixVal > 0 && faceMixVal > 0) {
      if (hairMixVal === faceMixVal) {
        return 3
      } else if (hairMixVal > faceMixVal) {
        return 4
      } else {
        return 5
      }
    }
    return 6
  }, [hairMixValue, faceMixValue])

  useEffect(() => {
    let imageList = [{ src: imageHairBaseFaceBaseUri }]
    const hairMixVal = hairMixValue * 1
    const faceMixVal = faceMixValue * 1
    if (hairMixVal < 1 && faceMixVal > 0) {
      imageList.push({
        src: imageHairBaseFaceMixUri,
        opacity: faceMixVal / 100,
      })
    } else if (hairMixVal > 0 && faceMixVal < 1) {
      imageList.push({
        src: imageHairMixFaceBaseUri,
        opacity: hairMixVal / 100,
      })
    } else if (hairMixVal > 0 && faceMixVal > 0) {
      if (hairMixVal === faceMixVal) {
        imageList.push({
          src: imageHairMixFaceMixUri,
          opacity: faceMixVal / 100,
        })
      } else if (hairMixVal > faceMixVal) {
        imageList.push({
          src: imageHairMixFaceBaseUri,
          opacity: 1 - (100 - hairMixVal) / (100 - faceMixVal),
        })
        imageList.push({
          src: imageHairMixFaceMixUri,
          opacity: faceMixVal / 100,
        })
      } else {
        imageList.push({
          src: imageHairBaseFaceMixUri,
          opacity: 1 - (100 - faceMixVal) / (100 - hairMixVal),
        })
        imageList.push({
          src: imageHairMixFaceMixUri,
          opacity: hairMixVal / 100,
        })
      }
    }
    mergeImages(imageList).then(b64 => {
      setImageUri(b64)
    })
  }, [
    imageHairBaseFaceBaseUri,
    imageHairMixFaceBaseUri,
    imageHairMixFaceMixUri,
    imageHairBaseFaceMixUri,
    hairMixValue,
    faceMixValue,
    mergeImages,
  ])
  useEffect(() => {
    setIsAnimated(false)
  }, [
    selectedSkin,
    selectedHair,
    selectedFace,
    selectedFaceAccessory,
    selectedHat,
    selectedOverall,
    selectedTop,
    selectedBottom,
    selectedShoes,
    selectedCape,
    selectedWeapon,
    hairMixValue,
    faceMixValue,
    hairBaseColor,
    hairMixColor,
    faceBaseColor,
    faceMixColor,
  ])
  console.log(selectedWeapon)
  return (
    <Layout pageInfo={{ pageName: "coordinateSimulator" }}>
      <SEO title="Coordinate Simulator" />
      <Container
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <Row>
          <Col
            className="col-lg-10"
            style={{ "overflow-y": "auto", "max-height": "700px" }}
          >
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
            {hairColorDisabled ? (
              <Row>
                <p
                  style={{
                    color: "red",
                    "font-size": "8px",
                  }}
                >
                  {" "}
                  주의) 이 헤어는 염색을 지원하지 않습니다!{" "}
                </p>
              </Row>
            ) : null}
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
              selectDisabled={hairColorDisabled}
            />
            <MixRatio
              mixValue={hairMixValue}
              setMixValue={setHairMixValue}
              selectedBaseColor={hairBaseColor}
              selectedMixColor={hairMixColor}
              selectDisabled={hairColorDisabled}
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
            <MixRatio
              mixValue={faceMixValue}
              setMixValue={setFaceMixValue}
              selectedBaseColor={faceBaseColor}
              selectedMixColor={faceMixColor}
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
              setSelectedParts={weapon => {
                if (action !== "jump") {
                  if (
                    weapon?.typeInfo.subCategory === "Pole Arm" ||
                    weapon?.typeInfo.subCategory === "Spear"
                  ) {
                    setAction("stand2")
                  } else {
                    setAction("stand1")
                  }
                }
                setSelectedWeapon(weapon)
              }}
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
                {!isAnimated && <Figure.Image src={imageUri} />}
                {isAnimated && (
                  <Row>
                    <Suspense
                      fallback={
                        <Spinner
                          animation="border"
                          style={{ "margin-bottom": "70px" }}
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      }
                      style={{ position: "relative" }}
                    >
                      <SuspenseImg
                        src={imageHairBaseFaceBaseUri}
                        style={{
                          "max-width": "190px",
                          "background-color": "transparent",
                        }}
                      />
                      {(visualizationMode === 1 || visualizationMode === 5) && (
                        <SuspenseImg
                          src={imageHairBaseFaceMixUri}
                          style={{
                            position: "absolute",
                            opacity:
                              visualizationMode === 1
                                ? (faceMixValue * 1) / 100
                                : 1 -
                                  (100 - faceMixValue * 1) /
                                    (100 - hairMixValue * 1),
                            "max-width": "190px",
                            "background-color": "transparent",
                          }}
                        />
                      )}
                      {(visualizationMode === 2 || visualizationMode === 4) && (
                        <SuspenseImg
                          src={imageHairMixFaceBaseUri}
                          style={{
                            position: "absolute",
                            opacity:
                              visualizationMode === 2
                                ? (hairMixValue * 1) / 100
                                : 1 -
                                  (100 - hairMixValue * 1) /
                                    (100 - faceMixValue * 1),
                            "max-width": "190px",
                            "background-color": "transparent",
                          }}
                        />
                      )}
                      {(visualizationMode === 3 ||
                        visualizationMode === 4 ||
                        visualizationMode === 5) && (
                        <SuspenseImg
                          src={imageHairMixFaceMixUri}
                          style={{
                            position: "absolute",
                            opacity:
                              visualizationMode === 5
                                ? (hairMixValue * 1) / 100
                                : (faceMixValue * 1) / 100,
                            "max-width": "190px",
                            "background-color": "transparent",
                          }}
                        />
                      )}
                    </Suspense>
                  </Row>
                )}
              </Row>

              <Row className="justify-content-center">
                <Button
                  variant="primary"
                  onClick={() => forceDownload(imageUri)}
                >
                  다운로드
                </Button>
              </Row>
              <br />
              <Row>
                <p
                  style={{
                    color: "red",
                    "font-size": "5px",
                    "text-align": "center",
                  }}
                >
                  주의) 되도록이면 코디 완성 후 모션 적용해주세요! 모션이
                  존재하지 않는 경우 뜨지 않을 수 있습니다!
                </p>
              </Row>

              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 점프"
                  checked={action === "jump" && isAnimated}
                  onChange={() => {
                    if (!(action === "jump" && isAnimated)) {
                      setAction("jump")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 서 있기(한손)"
                  checked={action === "stand1" && isAnimated}
                  onChange={() => {
                    if (!(action === "stand1" && isAnimated)) {
                      setAction("stand1")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 서 있기(두손)"
                  checked={action === "stand2" && isAnimated}
                  onChange={() => {
                    if (!(action === "stand2" && isAnimated)) {
                      setAction("stand2")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 걷기(한손)"
                  checked={action === "walk1" && isAnimated}
                  onChange={() => {
                    if (!(action === "walk1" && isAnimated)) {
                      setAction("walk1")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>

              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 걷기(두손)"
                  checked={action === "walk2" && isAnimated}
                  onChange={() => {
                    if (!(action === "walk2" && isAnimated)) {
                      setAction("walk2")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>

              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 로프 타기"
                  checked={action === "rope" && isAnimated}
                  onChange={() => {
                    if (!(action === "rope" && isAnimated)) {
                      setAction("rope")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 활 쏘기"
                  checked={action === "shoot1" && isAnimated}
                  onChange={() => {
                    if (!(action === "shoot1" && isAnimated)) {
                      setAction("shoot1")
                      setIsAnimated(true)
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 휘두르기(한손)"
                  checked={action === "swingO2" && isAnimated}
                  onChange={() => {
                    if (!(action === "swingO2" && isAnimated)) {
                      if (!selectedWeapon) {
                        window.alert("무기를 선택해주세요!")
                      } else {
                        setAction("swingO2")
                        setIsAnimated(true)
                      }
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
              <Row>
                <Form.Check
                  type="checkbox"
                  label="모션: 휘두르기(두손)"
                  checked={action === "swingP1" && isAnimated}
                  onChange={() => {
                    if (!(action === "swingP1" && isAnimated)) {
                      if (!selectedWeapon) {
                        window.alert("무기를 선택해주세요!")
                      } else {
                        setAction("swingP1")
                        setIsAnimated(true)
                      }
                    } else if (
                      selectedWeapon?.typeInfo.subCategory === "Pole Arm" ||
                      selectedWeapon?.typeInfo.subCategory === "Spear"
                    ) {
                      setAction("stand2")
                      setIsAnimated(false)
                    } else {
                      setAction("stand1")
                      setIsAnimated(false)
                    }
                  }}
                />
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default React.memo(CoordinateSimulator)
