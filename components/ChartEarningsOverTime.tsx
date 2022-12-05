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
    const dataNumberList = [] as number[]
    const data = historicEarnings
      .filter(({ date }, idx, arr) => {
        // if following dates are identical, remove
        return !(date === arr[idx - 1]?.date)
      })
      .map(({ date, earnings }) => {
        dataNumberList.push(earnings.amountUsdc as any)
        return [date, earnings.amountUsdc]
      })
    // At least show 1,2,3,4 points for Yaxis
    if (dataNumberList.length === 0) dataNumberList.push(4)
    const minValue = Math.min(...dataNumberList)
    chart.setOption(createChartConfig(data, minValue))
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

function createChartConfig(data: string[][], minValue: number) {
  return {
    tooltip: {
      trigger: "axis",
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
      min: minValue,
    },
    grid: {
      height: 180,
      left: 56,
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
