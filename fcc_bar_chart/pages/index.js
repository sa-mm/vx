import BarChart from '../components/chart.js'
import AreaChart from '../components/area_chart.js'

const Index = () => {
  return (
    <div>
      <p>Hello?</p>
      <p>U.S. GDP</p>
      <BarChart />
      <p>A bit nicer:</p>
      <AreaChart />
    </div>
  )
}

export default Index
