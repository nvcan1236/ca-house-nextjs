"use client";
import H3 from "@/components/common/h3";

const ApprovePage = () => {
  // const filter = useAppSelector((state) => state.filter);
  // const { data } = useGetMotelsQuery({
  //   page: 1,
  //   size: 100,
  //   filter,
  //   isAdmin: true,
  // });
  // const motelNotApproved = data?.result.data.filter(
  //   (motel) => motel.status == "NOT_APPROVED"
  // );
  return (
    <div className="w-full">
      <H3 className="pl-10">Danh sách trọ chờ duyệt</H3>
      {/* <DataTable columns={columns} data={motelNotApproved || []} /> */}
    </div>
  );
};
export default ApprovePage;
