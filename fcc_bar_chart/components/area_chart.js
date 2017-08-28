import React from 'react'
import json from '../data/GDP-data.json'
import { Group } from '@vx/group'
import { AreaClosed } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'
import { ScaleSVG } from '@vx/responsive'

const width = 800
const height = 400
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80
}
const xMax = width - margin.left - margin.right
const yMax = height - margin.top - margin.bottom

const data = json.data

// const w = 800
// const h = 400
// const padding = 60
// const barWidth = 1

const myParser = str => str.split('-') // check if nec
const years = data.map(d => new Date(...myParser(d[0])))

const max = arr => arr.sort((a, b) => b - a)[0]

const min = arr => arr.sort((a, b) => a - b)[0]

// console.log(min(years))

const xScale = scaleTime({
  domain: [min(years), max(years)],
  rangeRound: [0, xMax]
})

const gdp = data.map(d => d[1])

const yScale = scaleLinear({
  domain: [0, max(gdp)],
  range: [yMax, 0]
})

const mungedData = years.map((e, i) => [e, gdp[i]])

const x = d => d[0] // d.date is unix timestamps
const y = d => d[1]

const chart = (
  <ScaleSVG width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      <LinearGradient
        from='#fbc2eb'
        to='#a6c1ee'
        id='gradient'
      />

      <AreaClosed
        data={mungedData}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        fill={'url(#gradient)'}
        stroke={''}
      />

      <AxisLeft
        scale={yScale}
        top={0}
        left={0}
        label={'Billions of Dollars'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />

      <AxisBottom
        scale={xScale}
        top={yMax}
        label={'Years'}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />

    </Group>
  </ScaleSVG>
)

function AreaChart () {
  return chart
}

export default AreaChart
