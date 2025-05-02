"use client"

import React, { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useUpdatePaymentStatus } from "@/services/motelUtilApi"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

const PaymentStatusContent = () => {
  const searchParams = useSearchParams()
  const responseCode = searchParams.get("vnp_ResponseCode")
  const reservationId = searchParams.get("vnp_TxnRef")
  const isSuccess = responseCode === "00"
  const { mutate: updateStatus } = useUpdatePaymentStatus()

  const summary = {
    orderId: searchParams.get("vnp_TxnRef"),
    amount: Number(searchParams.get("vnp_Amount")) / 100,
    transactionNo: searchParams.get("vnp_TransactionNo"),
    payDate: searchParams.get("vnp_PayDate"),
    bankCode: searchParams.get("vnp_BankCode"),
    cardType: searchParams.get("vnp_CardType"),
  }

  const formatVnpayDate = (dateString: string | null) => {
    if (!dateString) return ""

    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    const hour = dateString.substring(8, 10)
    const minute = dateString.substring(10, 12)
    const second = dateString.substring(12, 14)

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
  }

  useEffect(() => {
    if (reservationId)
      updateStatus({
        reservationId,
        status: isSuccess ? "PAYMENT_SUCCESS" : "PAYMENT_FAIL",
      })
  }, [reservationId, isSuccess])

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg text-center">
        {isSuccess ? (
          <>
            <CheckCircle2Icon className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600">
              Thanh toán thành công!
            </h2>
          </>
        ) : (
          <>
            <XCircleIcon className="text-red-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600">
              Thanh toán thất bại!
            </h2>
          </>
        )}

        <div className="mt-6 text-left">
          <p>
            <strong>Mã đơn hàng:</strong> {summary.orderId}
          </p>
          <p>
            <strong>Số tiền:</strong> {summary.amount.toLocaleString()} VND
          </p>
          <p>
            <strong>Ngân hàng:</strong> {summary.bankCode}
          </p>
          <p>
            <strong>Loại thẻ:</strong> {summary.cardType}
          </p>
          <p>
            <strong>Số giao dịch:</strong> {summary.transactionNo}
          </p>
          <p>
            <strong>Thời gian:</strong> {formatVnpayDate(summary.payDate)}
          </p>
        </div>

        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:underline">
            Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <PaymentStatusContent />
    </Suspense>
  )
}
