import { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Shared components and configurations
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import { ACCOUNT_TYPE } from './utils/constants';
import Loading from "./components/common/Loading";
import { HiArrowNarrowUp } from "react-icons/hi"

// Lazy-loaded top-level page components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const CourseDetails = lazy(() => import('./pages/CourseDetails'));
const Catalog = lazy(() => import('./pages/Catalog'));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyProfile = lazy(() => import("./components/core/Dashboard/MyProfile"));
const Settings = lazy(() => import("./components/core/Dashboard/Settings/Settings"));
const MyCourses = lazy(() => import('./components/core/Dashboard/MyCourses'));
const EditCourse = lazy(() => import('./components/core/Dashboard/EditCourse/EditCourse'));
const Instructor = lazy(() => import('./components/core/Dashboard/Instructor'));
const Cart = lazy(() => import("./components/core/Dashboard/Cart/Cart"));
const EnrolledCourses = lazy(() => import("./components/core/Dashboard/EnrolledCourses"));
const PurchaseHistory = lazy(() => import("./components/core/Dashboard/PurchaseHistory"));
const AddCourse = lazy(() => import("./components/core/Dashboard/AddCourse/AddCourse"));

const ViewCourse = lazy(() => import("./pages/ViewCourse"));
const VideoDetails = lazy(() => import('./components/core/ViewCourse/VideoDetails'));


function App() {

  const { user } = useSelector((state) => state.profile)

  // Scroll to the top of the page when the route changes
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [location.pathname]);

  // Go upward arrow - show / hide logic
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleArrow = () => {
      const shouldShow = window.scrollY > 500;
      setShowArrow(prev => prev === shouldShow ? prev : shouldShow);
    };
    window.addEventListener('scroll', handleArrow, { passive: true });
    return () => window.removeEventListener('scroll', handleArrow);
  }, []);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      {/* go upward arrow */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`bg-yellow-25 hover:bg-yellow-50 hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${showArrow ? 'bottom-6' : '-bottom-24'} `} >
        <HiArrowNarrowUp />
      </button>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />

          {/* Open Route - for Only Non Logged in User */}
          <Route
            path="signup" element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />

          <Route
            path="login" element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route
            path="forgot-password" element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="verify-email" element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          <Route
            path="update-password/:id" element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          {/* Protected Route - for Only Logged in User */}
          {/* Dashboard */}
          <Route element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />

            {/* Route only for Students */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
              </>
            )}

            {/* Route only for Instructors */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )}
          </Route>


          {/* For the watching course lectures */}
          <Route
            element={
              <ProtectedRoute>
                <ViewCourse />
              </ProtectedRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            )}
          </Route>




          {/* Page Not Found (404 Page ) */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
