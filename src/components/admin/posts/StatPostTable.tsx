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
import { PostStat } from "@/utils/types";
import { FC } from "react";

const StatPostTable:FC<{data:PostStat}> = ({data}) => {
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-wrap">
        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Bảng báo cáo số lượng bài đăng theo thời gian.
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
                Bảng báo cáo số lượng bài đăng theo loại.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại bài đăng</TableHead>
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
                    {data?.byPeriod
                      .reduce((acc, type) => acc + type.count, 0)
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

export default StatPostTable;
