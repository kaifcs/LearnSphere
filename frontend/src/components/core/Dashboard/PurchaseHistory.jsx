import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getPurchaseHistory } from "../../../services/operations/studentFeaturesAPI"
import Img from './../../common/Img';
import { formattedDate } from "../../../utils/dateFormatter"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [purchaseHistory, setPurchaseHistory] = useState(null)

  const fetchPurchaseHistory = async () => {
    try {
      const res = await getPurchaseHistory(token);
      setPurchaseHistory(res);
    } catch (error) {
      console.error("Could not fetch purchase history.")
    }
  };

  useEffect(() => {
    if (token) {
      fetchPurchaseHistory();
    }
  }, [token])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '></div>
          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>
      </div>
    )
  }

  // return if data is null
  if (purchaseHistory?.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
        No purchase history found.
      </p>
    )
  }

  return (
    <>
      <div className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">Purchase History</div>
      {
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="hidden sm:flex rounded-t-2xl bg-richblack-800 ">
            <p className="w-[30%] px-5 py-3">Course(s)</p>
            <p className="w-[10%] px-2 py-3">Amount</p>
            <p className="w-[15%] px-2 py-3">Status</p>
            <p className="w-[20%] px-2 py-3">Payment ID</p>
            <p className="w-[15%] px-2 py-3">Date</p>
          </div>

          {/* loading Skeleton */}
          {!purchaseHistory && <div >
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>}

          {/* Purchase Details */}
          {
            purchaseHistory?.map((purchase, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
                key={purchase.paymentId}
              >
                {/* Course Name(s) */}
                <div className="flex sm:w-[30%] items-center gap-4 px-5 py-3">
                  <div className="flex flex-col gap-2">
                    {purchase.courses?.map((course) => (
                       <div key={course._id} className="flex items-center gap-3">
                         <Img
                           src={course.thumbnail}
                           alt="course_img"
                           className="h-10 w-10 rounded-lg object-cover"
                         />
                         <p className="font-semibold text-sm max-w-[150px] truncate">{course.courseName}</p>
                       </div>
                    ))}
                  </div>
                </div>

                {/* Mobile View details */}
                <div className='sm:hidden px-5 pb-4 flex flex-col gap-2 text-sm'>
                  <p><span className="text-richblack-300">Amount:</span> Rs. {purchase.amount}</p>
                  <p><span className="text-richblack-300">Status:</span> {purchase.status}</p>
                  <p><span className="text-richblack-300">Payment ID:</span> {purchase.paymentId}</p>
                  <p><span className="text-richblack-300">Order ID:</span> {purchase.orderId}</p>
                  <p><span className="text-richblack-300">Date:</span> {formattedDate(purchase.createdAt)}</p>
                </div>

                {/* Desktop View details */}
                <div className="hidden sm:flex w-[10%] px-2 py-3 text-sm">Rs. {purchase.amount}</div>
                <div className="hidden sm:flex w-[15%] px-2 py-3 text-sm">
                   <span className={`px-2 py-1 rounded-full text-xs ${purchase.status === 'Success' ? 'bg-caribbeangreen-200 text-caribbeangreen-900' : 'bg-pink-200 text-pink-900'}`}>
                     {purchase.status}
                   </span>
                </div>
                <div className="hidden sm:flex w-[20%] flex-col gap-1 px-2 py-3 text-xs">
                    <p>Pay: {purchase.paymentId}</p>
                    <p className="text-richblack-300">Ord: {purchase.orderId}</p>
                </div>
                <div className="hidden sm:flex w-[15%] px-2 py-3 text-sm">{formattedDate(purchase.createdAt)}</div>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}
