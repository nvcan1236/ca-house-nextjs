"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import H3 from "@/components/common/h3";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SelectBox from "@/components/common/select-box";
import StatPeriodChart from "@/components/admin/motels/stat-period-chart";
import StatTypeChart from "@/components/admin/motels/stat-type-chart";
import StatPriceChart from "@/components/admin/motels/stat-price-chart";
import StatMotelTable from "@/components/admin/motels/stat-motel-table";
import StatAreaChart from "@/components/admin/motels/stat-area-chart";

const StatMotel = () => {
  const [filter, setFilter] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    period: "MONTH",
  });
  // const { data } = useGetMotelStatQuery({
  //   startDate: filter.startDate,
  //   endDate: filter.endDate,
  // });

  const data = [];
  return (
    <div>
      <Tabs defaultValue="chart">
        <div className="flex justify-between">
          <H3 className="pl-10">Báo cáo thống kê nhà trọ</H3>
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
                setFilter({ ...filter, period: value });
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
                  Thống kê theo loại phòng
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="pt-10">
                <StatPriceChart data={data?.result?.byPrice || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo khoảng giá
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="pt-10">
                <StatAreaChart data={data?.result?.byArea || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo khoảng diện tích
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <StatMotelTable data={data?.result} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatMotel;
