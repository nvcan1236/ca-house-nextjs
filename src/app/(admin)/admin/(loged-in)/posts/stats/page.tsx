"use client"

import { useState } from "react"
import { useGetPostStat } from "@/services/postApi"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import H3 from "@/components/common/h3"
import SelectBox from "@/components/common/select-box"
import StatPeriodChart from "@/app/(admin)/admin/(loged-in)/motels/stats/stat-period-chart"

import StatPostTable from "./stat-post-table"
import StatTypeChart from "./stat-type-chart"

const StatPost = () => {
  const { data } = useGetPostStat()
  const [filter, setFilter] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    period: "MONTH",
  })
  return (
    <div>
      <Tabs defaultValue="chart">
        <div className="flex justify-between">
          <H3 className="pl-10">Báo cáo thống kê bài đăng</H3>
          <TabsList className="grid grid-cols-2 w-[240px]">
            <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Bảng</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-4 mt-6 ">
          <div>
            <Label htmlFor="startDate">Từ ngày:</Label>
            <Input
              type="date"
              id="startDate"
              onChange={(e) =>
                setFilter({ ...filter, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="endDate">Đến ngày:</Label>
            <Input
              type="date"
              id="endDate"
              onChange={(e) =>
                setFilter({ ...filter, endDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Thống kê theo:</Label>
            <SelectBox
              options={[
                { label: "Tháng", value: "MONTH" },
                { label: "Năm", value: "MONTH" },
                { label: "Quý", value: "QUARTER" },
              ]}
              onSelectChange={(value) => {
                setFilter({ ...filter, period: value })
              }}
            ></SelectBox>
          </div>
        </div>
        <TabsContent value="chart">
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 flex-wrap">
            <Card>
              <CardContent className="pt-10">
                <StatPeriodChart data={data?.result?.byPeriod || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo thời gian
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="pt-10">
                <StatTypeChart data={data?.result?.byType || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo loại bài đăng
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <StatPostTable data={data?.result} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StatPost
