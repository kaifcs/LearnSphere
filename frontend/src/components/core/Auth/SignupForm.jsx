import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch =
  confirmPassword.length > 0 && password === confirmPassword;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // console.log('signup form data - ', formData);
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    // Password length validation
    if (password.length < 8) {
      toast.error("Minimum 8 characters required");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
      email: email.trim().toLowerCase(),
      accountType,
    };

    // Save signup data for OTP verification
    dispatch(setSignupData(signupData));

    // Send OTP only after all validations pass
    dispatch(sendOtp(signupData.email, navigate));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          {/* First Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
            />
          </label>

          {/* Last Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
            />
          </label>
        </div>

        {/* Email Address */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
        </label>


        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          {/* Create Password */}
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none border ${
                password.length === 0
                  ? "border-richblack-700"
                  : isPasswordValid
                    ? "border-caribbeangreen-300"
                    : "border-pink-300"
              }`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <p
              className={`mt-2 text-xs ${
                password.length === 0
                  ? "text-richblack-400"
                  : isPasswordValid
                  ? "text-caribbeangreen-300"
                  : "text-pink-200"
              }`}
            >
              {password.length === 0
                ? "Minimum 8 characters required."
                : isPasswordValid
                ? "✓ Minimum length satisfied."
                : `Minimum 8 characters required (${password.length}/8).`}
            </p>
          </label>

          {/* Confirm Password  */}
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none border ${
                confirmPassword.length === 0
                  ? "border-richblack-700"
                  : doPasswordsMatch
                    ? "border-caribbeangreen-300"
                    : "border-pink-300"
              }`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {confirmPassword.length > 0 && (
              <p
                className={`mt-2 text-xs ${
                  doPasswordsMatch
                    ? "text-caribbeangreen-300"
                    : "text-pink-200"
                }`}
              >
                {doPasswordsMatch
                  ? "✓ Passwords match."
                  : "Passwords do not match."}
              </p>
            )}
          </label>
        </div>


        <button
          type="submit"
          disabled={loading}
          className={`mt-6 rounded-[8px] py-[8px] px-[12px] font-medium transition-all duration-200 ${
            loading
              ? "cursor-not-allowed bg-richblack-500 text-richblack-100"
              : "bg-yellow-50 text-richblack-900 hover:scale-[1.02]"
          }`}
        >
          {loading ? "Sending OTP..." : "Create Account"}
        </button>
      </form>
    </div>
  )
}

export default SignupForm