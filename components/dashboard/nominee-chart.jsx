"use client"
import { Pie, PieChart, Label, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Plus } from "@phosphor-icons/react/dist/ssr"

// Sample data for nominees and their shares
const pieData = [
  { name: "Spouse", share: 40, fill: "color-mix(in oklch, var(--primary) 90%, transparent)" },
  { name: "Child 1", share: 25, fill: "color-mix(in oklch, var(--primary) 70%, transparent)" },
  { name: "Child 2", share: 20, fill: "color-mix(in oklch, var(--primary) 50%, transparent)" },
  { name: "Charity", share: 15, fill: "color-mix(in oklch, var(--primary) 30%, transparent)" },
]

const chartConfig = {
  share: {
    label: "Share (%)",
  },
  spouse: {
    label: "Spouse",
    color: "color-mix(in oklch, var(--primary) 90%, transparent)",
  },
  child1: {
    label: "Child 1",
    color: "color-mix(in oklch, var(--primary) 70%, transparent)",
  },
  child2: {
    label: "Child 2",
    color: "color-mix(in oklch, var(--primary) 50%, transparent)",
  },
  charity: {
    label: "Charity",
    color: "color-mix(in oklch, var(--primary) 30%, transparent)",
  },
}

const formatPercentage = (value) => `${value}%`

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="var(--foreground)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <div className="grid gap-2">
          <p className="font-semibold">{data.name}</p>
          <p>Share: {formatPercentage(data.share)}</p>
        </div>
      </div>
    )
  }
  return null
}

function NomineeShareChart() {
  const totalShare = pieData.reduce((sum, item) => sum + item.share, 0)

  return (
    <Card className="w-full max-w-2xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="font-semibold text-xl">Nominee Distribution</CardTitle>
          <CardDescription>Estate Share Allocation per Nominee</CardDescription>
        </div>
        <Button className="rounded-full px-8">
          Add Nominee <Plus weight="duotone" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ChartContainer 
          config={chartConfig} 
          className="h-full w-full min-h-[400px]"
        >
          <PieChart>
            <ChartTooltip content={<CustomTooltip />} />
            <Pie
              data={pieData}
              dataKey="share"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="40%"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend 
              content={<ChartLegendContent />}
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default NomineeShareChart