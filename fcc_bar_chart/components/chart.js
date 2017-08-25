import React from 'react'
import json from '../data/GDP-data.json'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'
import { AxisBottom, AxisLeft } from '@vx/axis'

const data = json.data

const w = 800
const h = 400
const padding = 60
const barWidth = 1

const myParser = str => str.split('-') // check if nec
const years = data.map(d => new Date(...myParser(d[0])))

const max = arr => arr.sort((a, b) => b - a)[0]

const min = arr => arr.sort((a, b) => a - b)[0]

// console.log(min(years))

const xScale = scaleTime({
  domain: [min(years), max(years)],
  rangeRound: [padding, w - padding]
})

const gdp = data.map(d => d[1])

const yScale = scaleLinear({
  domain: [0, max(gdp)],
  range: [h - padding, padding]
})

const mungedData = years.map((e, i) => [e, gdp[i]])

function BarChart (props) {
  return (
    <svg width={w} height={h}>
      {mungedData.map((d, i) => {
        const barHeight = h - padding - yScale(d[1])
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xScale(d[0])}
              y={yScale(d[1])}
              height={barHeight}
              width={barWidth}
              fill='blue'
            />
            <AxisBottom
              scale={xScale}
              top={h - padding}
              left={0}
              label={'Years'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />
            <AxisLeft
              scale={yScale}
              top={0}
              left={padding}
              label={'Billions of Dollars'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />
          </Group>
        )
      })}
    </svg>
  )
}

export default BarChart
