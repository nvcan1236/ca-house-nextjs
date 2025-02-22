"use client"

import { useGetPosts } from "@/services/postApi"

import H3 from "@/components/common/h3"
import { columns } from "@/components/post/post-column"
import { DataTable } from "@/components/post/table-data"

const ManagePosts = () => {
  const { data } = useGetPosts(0)

  return (
    <div className="">
      <H3 className="pl-10">Quản lý bài đăng</H3>
      <div className="mt-6">
        <DataTable columns={columns} data={data?.result || []} />
      </div>
    </div>
  )
}

export default ManagePosts

// const data: IPost[] = [
//   {
//     content: "Beautiful room in downtown!",
//     id: "post1",
//     type: "REVIEW",
//     create_by: "user123",
//     images: [{ url: "https://example.com/room1.jpg", id: "Room view" }],
//     comment_count: 12,
//     react_count: 45,
//     liked: "LOVE",
//     create_at: "2024-09-12T12:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Looking for a roommate in District 7",
//     id: "post2",
//     type: "FIND_ROOMMATE",
//     create_by: "user456",
//     images: [],
//     comment_count: 5,
//     react_count: 20,
//     liked: "HAPPY",
//     create_at: "2024-09-10T10:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Passing on my room near the university",
//     id: "post3",
//     type: "PASS_ROOM",
//     create_by: "user789",
//     images: [{ url: "https://example.com/room2.jpg", id: "Spacious room" }],
//     comment_count: 2,
//     react_count: 13,
//     liked: null,
//     create_at: "2024-09-09T08:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Review of the new apartment in town",
//     id: "post4",
//     type: "REVIEW",
//     create_by: "user101",
//     images: [
//       { url: "https://example.com/apartment1.jpg", id: "Modern interior" },
//     ],
//     comment_count: 8,
//     react_count: 25,
//     liked: "LIKE",
//     create_at: "2024-09-08T14:30:00Z",
//     owner: null,
//   },
//   {
//     content: "Room available near the city center",
//     id: "post5",
//     type: "FIND_ROOM",
//     create_by: "user102",
//     images: [{ url: "https://example.com/room3.jpg", id: "Cozy room" }],
//     comment_count: 3,
//     react_count: 10,
//     liked: null,
//     create_at: "2024-09-07T17:45:00Z",
//     owner: null,
//   },
//   {
//     content: "Amazing place for students",
//     id: "post6",
//     type: "REVIEW",
//     create_by: "user103",
//     images: [{ url: "https://example.com/place1.jpg", id: "Study corner" }],
//     comment_count: 6,
//     react_count: 30,
//     liked: "HAPPY",
//     create_at: "2024-09-06T09:15:00Z",
//     owner: null,
//   },
//   {
//     content: "Need a room in District 3",
//     id: "post7",
//     type: "FIND_ROOM",
//     create_by: "user104",
//     images: [],
//     comment_count: 1,
//     react_count: 5,
//     liked: null,
//     create_at: "2024-09-05T12:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Cozy room for rent",
//     id: "post8",
//     type: "PASS_ROOM",
//     create_by: "user105",
//     images: [
//       { url: "https://example.com/room4.jpg", id: "Small but comfortable" },
//     ],
//     comment_count: 4,
//     react_count: 15,
//     liked: "LIKE",
//     create_at: "2024-09-04T11:30:00Z",
//     owner: null,
//   },
//   {
//     content: "Looking for a friendly roommate",
//     id: "post9",
//     type: "FIND_ROOMMATE",
//     create_by: "user106",
//     images: [{ url: "https://example.com/roommate1.jpg", id: "Shared room" }],
//     comment_count: 7,
//     react_count: 18,
//     liked: "LOVE",
//     create_at: "2024-09-03T15:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Passing my room in District 1",
//     id: "post10",
//     type: "PASS_ROOM",
//     create_by: "user107",
//     images: [{ url: "https://example.com/room5.jpg", id: "Prime location" }],
//     comment_count: 3,
//     react_count: 22,
//     liked: "HAPPY",
//     create_at: "2024-09-02T10:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Spacious room for rent",
//     id: "post11",
//     type: "FIND_ROOM",
//     create_by: "user108",
//     images: [],
//     comment_count: 0,
//     react_count: 8,
//     liked: null,
//     create_at: "2024-09-01T18:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Great experience at the apartment",
//     id: "post12",
//     type: "REVIEW",
//     create_by: "user109",
//     images: [
//       {
//         url: "https://example.com/apartment2.jpg",
//         id: "Stylish interior",
//       },
//     ],
//     comment_count: 10,
//     react_count: 40,
//     liked: "LOVE",
//     create_at: "2024-08-31T12:30:00Z",
//     owner: null,
//   },
//   {
//     content: "Need a room urgently!",
//     id: "post13",
//     type: "FIND_ROOM",
//     create_by: "user110",
//     images: [],
//     comment_count: 2,
//     react_count: 12,
//     liked: null,
//     create_at: "2024-08-30T08:45:00Z",
//     owner: null,
//   },
//   {
//     content: "Affordable room for rent",
//     id: "post14",
//     type: "PASS_ROOM",
//     create_by: "user111",
//     images: [
//       {
//         url: "https://example.com/room6.jpg",
//         id: "Budget-friendly",
//       },
//     ],
//     comment_count: 1,
//     react_count: 5,
//     liked: null,
//     create_at: "2024-08-29T14:20:00Z",
//     owner: null,
//   },
//   {
//     content: "Friendly roommate needed in District 4",
//     id: "post15",
//     type: "FIND_ROOMMATE",
//     create_by: "user112",
//     images: [],
//     comment_count: 4,
//     react_count: 16,
//     liked: "LIKE",
//     create_at: "2024-08-28T13:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Passing my spacious room in District 5",
//     id: "post16",
//     type: "PASS_ROOM",
//     create_by: "user113",
//     images: [{ url: "https://example.com/room7.jpg", id: "Large room" }],
//     comment_count: 0,
//     react_count: 20,
//     liked: "HAPPY",
//     create_at: "2024-08-27T09:45:00Z",
//     owner: null,
//   },
//   {
//     content: "Highly recommend this apartment!",
//     id: "post17",
//     type: "REVIEW",
//     create_by: "user114",
//     images: [
//       {
//         url: "https://example.com/apartment3.jpg",
//         id: "Cozy space",
//       },
//     ],
//     comment_count: 6,
//     react_count: 30,
//     liked: "LOVE",
//     create_at: "2024-08-26T16:30:00Z",
//     owner: null,
//   },
//   {
//     content: "Need a room for students",
//     id: "post18",
//     type: "FIND_ROOM",
//     create_by: "user115",
//     images: [],
//     comment_count: 3,
//     react_count: 9,
//     liked: null,
//     create_at: "2024-08-25T18:15:00Z",
//     owner: null,
//   },
//   {
//     content: "Passing my room in Binh Thanh",
//     id: "post19",
//     type: "PASS_ROOM",
//     create_by: "user116",
//     images: [
//       {
//         url: "https://example.com/room8.jpg",
//         id: "Great for students",
//       },
//     ],
//     comment_count: 5,
//     react_count: 23,
//     liked: "LIKE",
//     create_at: "2024-08-24T14:00:00Z",
//     owner: null,
//   },
//   {
//     content: "Looking for a quiet roommate",
//     id: "post20",
//     type: "FIND_ROOMMATE",
//     create_by: "user117",
//     images: [],
//     comment_count: 2,
//     react_count: 12,
//     liked: null,
//     create_at: "2024-08-23T19:00:00Z",
//   },
// ];
