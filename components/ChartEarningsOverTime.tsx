import * as echarts from "echarts"
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { noOp } from "@/lib/helpers"
import { formatNumberCompact } from "@/lib/numbers"

type HistoricEarnings = {
  date: string
  earnings: {
    amountUsdc: string
  }
}

function ChartEarningsOverTime({
  historicEarnings,
}: {
  historicEarnings: HistoricEarnings[]
}) {
  const [chart, setChart] = useState({
    setOption: noOp as any,
  } as echarts.ECharts)
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      setChart(
        echarts.init(containerRef.current, undefined, {
          renderer: "svg",
        })
      )
    }
  }, [])

  useEffect(() => {
    const data = historicEarnings
      .filter(({ date }, idx, arr) => {
        if (date == arr[idx - 1]?.date) return false
        return true
      })
      .map(({ date, earnings }) => {
        return [date, earnings.amountUsdc]
      })
    chart.setOption(createChartConfig(data))
    // only trigger re-paint on arra len change to avoid the whole shallow object evaluation
  }, [historicEarnings.length])

  return (
    <Fragment>
      <div className="relative w-full h-[240px]">
        <div ref={containerRef} className="inset-0 absolute" />
      </div>
    </Fragment>
  )
}

function createChartConfig(data: string[][]) {
  return {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"]
      },
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter(number: any) {
          return formatNumberCompact(number)
        },
      },
      splitNumber: 3,
      min: 4,
    },
    grid: {
      height: 180,
      left: 40,
      right: 0,
      top: 40,
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {
          color: "#0657f9",
        },
        data: data,
      },
    ],
  } as echarts.EChartsOption
}

export default ChartEarningsOverTime
