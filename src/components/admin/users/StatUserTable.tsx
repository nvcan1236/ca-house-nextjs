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
import { UserStat } from "@/utils/types";
import { FC } from "react";

const StatUserTable: FC<{ data?: UserStat }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 gap-10">
      <div className="lg:col-span-2">
        <Table>
          <TableCaption>Báo cáo người dùng theo thời điểm</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Thời gian</TableHead>
              <TableHead>Số người dùng thường</TableHead>
              <TableHead>Số chủ trọ</TableHead>
              <TableHead className="text-right">Tổng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.byPeriod.map((period) => (
              <TableRow key={period.period}>
                <TableCell className="font-medium">{period.period}</TableCell>
                <TableCell>{period.userCount}</TableCell>
                <TableCell>{period.ownerCount}</TableCell>
                <TableCell className="text-right">
                  {period.userCount + period.ownerCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                {data?.byPeriod
                  .reduce((acc, per) => acc + per.userCount, 0)
                  .toLocaleString()}
              </TableCell>
              <TableCell>
                {data?.byPeriod
                  .reduce((acc, per) => acc + per.ownerCount, 0)
                  .toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {data?.byPeriod
                  .reduce((acc, per) => acc + per.userCount + per.ownerCount, 0)
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Table>
        <TableCaption>Báo cáo người dùng theo role</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Role</TableHead>
            <TableHead>Số lượng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.byRole.map((role) => (
            <TableRow key={role.role}>
              <TableCell className="font-medium">{role.role}</TableCell>
              <TableCell>{role.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {data?.byRole
                .reduce((acc, role) => acc + role.count, 0)
                .toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default StatUserTable;
