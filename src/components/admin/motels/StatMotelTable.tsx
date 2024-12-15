import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotelStat } from "@/utils/types";
import { FC } from "react";

const StatMotelTable: FC<{ data: MotelStat }> = ({ data }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-wrap">
        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Bảng báo cáo số lượng trọ theo thời gian.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.byPeriod.map((d) => (
                  <TableRow key={d.period}>
                    <TableCell className="font-medium">{d.period}</TableCell>
                    <TableCell className="text-right">{d.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {data?.byPeriod
                      .reduce((acc, role) => acc + role.count, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Bảng báo cáo số lượng trọ theo loại phòng.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại phòng</TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.byType.map((d) => (
                  <TableRow key={d.type}>
                    <TableCell className="font-medium">{d.type}</TableCell>
                    <TableCell className="text-right">{d.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {data?.byType
                      .reduce((acc, role) => acc + role.count, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Bảng báo cáo số lượng trọ theo giá thuê.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Khoảng giá</TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.byPrice.map((d) => (
                  <TableRow key={d.range}>
                    <TableCell className="font-medium">
                      {`${d.range * 2000000} - ${(d.range + 1) * 2000000}`}
                    </TableCell>
                    <TableCell className="text-right">{d.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    {data?.byPrice
                      .reduce((acc, role) => acc + role.count, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Bảng báo cáo số lượng trọ theo diện tích.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Khoảng diện tích</TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.byArea.map((d) => (
                  <TableRow key={d.range}>
                    <TableCell className="font-medium">
                      {`${d.range * 5}m2 - ${(d.range + 1) * 5}m2`}
                    </TableCell>
                    <TableCell className="text-right">{d.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>
                    {data?.byArea
                      .reduce((acc, role) => acc + role.count, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatMotelTable;
