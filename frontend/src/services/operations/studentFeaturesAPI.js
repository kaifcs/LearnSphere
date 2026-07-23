import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  GET_PURCHASE_HISTORY_API,
} = studentEndpoints;

// ================= Load Razorpay SDK =================
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = src;

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

// ================= Buy Course =================
export async function buyCourse(
  token,
  coursesId,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    // Load Razorpay SDK
    const sdkLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    // Create Razorpay Order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { coursesId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const order = orderResponse.data.message;

    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,

      name: "LearnSphere",
      description: "Thank you for purchasing the course.",
      image: rzpLogo,

      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName || ""}`,
        email: userDetails.email,
        contact: userDetails.contactNumber || "",
      },

      handler: async (response) => {
        await sendPaymentSuccessEmail(
          response,
          order.amount,
          token
        );

        await verifyPayment(
          {
            ...response,
            coursesId,
          },
          token,
          navigate,
          dispatch
        );
      },
    };

    if (!window.Razorpay) {
      toast.error("Razorpay failed to initialize.");
      return;
    }

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", (response) => {
      console.error("Payment Failed:", response.error);

      toast.error(
        response.error?.description || "Payment failed."
      );
    });

    paymentObject.open();

  } catch (error) {
    console.error("Payment Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Could not initiate payment."
    );
  } finally {
      toast.dismiss(toastId);
  }
}

// ================= Send Payment Success Email =================
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.error("Payment success email error:", error);
  }
}

// ================= Verify Payment =================
async function verifyPayment(
  bodyData,
  token,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Verifying Payment...");

  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(
      "Payment successful! Course enrolled successfully."
    );

    dispatch(resetCart());

    navigate("/dashboard/enrolled-courses");

  } catch (error) {
    console.error("Verify Payment Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Could not verify payment."
    );
  } finally {
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  }
}

// ================= Get Purchase History =================
export async function getPurchaseHistory(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_PURCHASE_HISTORY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.error("Purchase history API error:", error);
    toast.error("Could not fetch purchase history");
  }
  return result;
}