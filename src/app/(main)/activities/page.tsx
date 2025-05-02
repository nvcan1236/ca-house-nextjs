import React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Appointment from "@/components/activities/appointment"
import Deposit from "@/components/activities/deposit"
import ProtectedRoute from "@/components/auth/protected-route"
import DecorativeHeading from "@/components/common/decorative-heading"

const ActivitiesPage = () => {
  return (
    <ProtectedRoute>
      <DecorativeHeading>Hoạt động</DecorativeHeading>
      <Tabs
        defaultValue="appointment"
        className="flex flex-col sm:flex-row gap-4 mt-6 "
      >
        <TabsList className="w-full md:w-[240px] flex md:flex-col items-stretch h-full gap-y-2 p-2">
          <TabsTrigger value="appointment" className="justify-start">
            Lịch sử xem phòng
          </TabsTrigger>
          <TabsTrigger value="deposit" className="justify-start">
            Lịch sử cọc phòng
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="appointment">
            <Card>
              <CardHeader>Lịch sử xem phòng</CardHeader>
              <CardContent className="space-y-2">
                <Appointment />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deposit">
            <Card>
              <CardHeader>Lịch sử cọc phòng</CardHeader>
              <CardContent className="space-y-2">
                <Deposit />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </ProtectedRoute>
  )
}

export default ActivitiesPage
