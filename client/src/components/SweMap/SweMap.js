
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import ReactTooltip from "react-tooltip"

const wrapperStyles = {
  width: "100%",
  maxWidth: 300,
  margin: "0 auto",
}

class SweMap extends Component {

  constructor(props){
    super(props)
    this.state={
        valkretsar: {
          "valkrets": {
            "Västra Götaland": 0,
            "Östergötland": 0,
            "Skåne": 0,
            "Stockholm": 0,
            "Blekinge": 0,
            "Jönköping": 0,
            "Uppsala": 0,
            "Kronoberg": 0,
            "Södermanland": 0,
            "Halland": 0,
            "Gävleborg": 0,
            "Kalmar": 0,
            "Västmanland": 0,
            "Orebro": 0,
            "Dalarna": 0,
            "Jämtland": 0,
            "Västerbotten": 0,
            "Värmland": 0,
            "Västernorrland": 0,
            "Norrbotten": 0,
            "Gotland": 0
          },
          "color": "#FFFFFF"
        }
    }
    
}
componentDidUpdate() {
  var data = Object.assign({}, this.props);
  if(Object.values(data.valkrets).length > 1 && data.valkrets != this.state.valkretsar.valkrets) {
    this.setState({valkretsar: data})
  }
}
componentDidMount() {
  setTimeout(() => {
    ReactTooltip.rebuild()
  }, 500)
}

  displayName (name) {
    var tipstring
    if (this.state.valkretsar.valkrets[name] === 1) {
      tipstring = name + ": " + this.state.valkretsar.valkrets[name] + " ledamot"
      return tipstring
    }
    else if (this.state.valkretsar.valkrets[name] > 1 || this.state.valkretsar.valkrets[name] === 0 ){
      tipstring = name + ": " + this.state.valkretsar.valkrets[name] + " ledamöter"
      return tipstring
    }
    else {
      tipstring = name + ": " + 0 + " ledamöter"
      return tipstring
    }
  }


  countyColor (name, statekrets, colorScale) {
    if (statekrets.valkrets[name]) {
      return colorScale(statekrets.valkrets[name])
    }
    else return colorScale(0)
  }

  render() {
    let max = Math.max.apply(Math, Object.values(this.state.valkretsar.valkrets))
    const colorScale = scaleLinear()
    .domain([0, max]) // Max is based on China
    .range(["#FFFFFF", this.state.valkretsar.color])

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projection="mercator"
          projectionConfig={{ scale: 790 }}
          width={300}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[ 17,62 ]} disablePanning>
            <Geographies geography="/sweden.json" disableOptimization>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      data-tip={this.displayName(geography.properties.NAME_1)}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: this.countyColor(geography.properties.NAME_1, this.state.valkretsar, colorScale),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        }
                      }}
                    />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
      </div>
    )
  }
}

export default SweMap
