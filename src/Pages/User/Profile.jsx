import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancellation() {
        toast("Initiating cancellation");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");

    }


   
    return (
        <HomeLayout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white max-w-md w-full md:w-96 shadow-[0_0_10px_black]">
                    <img
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                        <p>Email:</p>
                        <p>{userData?.email}</p>
                        <p>Role:</p>
                        <p>{userData?.role}</p>
                        <p>Subscription:</p>
                        <p>{userData?.subscription?.status === "active" || userData?.role === "ADMIN" ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Link 
                            to="/user/changepassword" 
                            className="w-full md:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            Change password
                        </Link>
                        <Link 
                            to="/user/editprofile" 
                            className="w-full md:w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            Edit profile
                        </Link>
                    </div>
                    {userData?.subscription?.status === "active" && (
                        <button  
                            onClick={handleCancellation}  
                            className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );

}

export default Profile;