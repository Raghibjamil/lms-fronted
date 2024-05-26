import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Displaylectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state.lecture);
    const {role} = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(`course id:-${courseId} lecture id:-${lectureId}`);
         state.numberOfLectures=state.numberOfLectures-1;

        console.log(state.numberOfLectures);
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
        await dispatch(getCourseLectures(courseId));

    }

    
   
 
    // useEffect(() => {
    //     console.log(state);
    //     if(!state) navigate("/courses");
    //     dispatch(getCourseLectures(state._id));


    // }, []);

    
    useEffect(() => {
        console.log(state);
        if (!state) {
            navigate("/courses");
        } else {
            dispatch(getCourseLectures(state._id));
        }
    }, [state, navigate, dispatch]);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%] ">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>


                {(lectures && lectures.length > 0 ) ?  
                    (<div className="flex justify-center gap-10 w-full ">                
                        {/* left section for playing videos and displaying course details to admin */}
                   <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"   
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"

                        >
                        </video>    
                        <div >
                            <h1 className="text-xl">
                                <span className="text-yellow-500"> Title:- {" "}
                                </span>
                                <span className="text-white">{" "} {lectures && lectures[currentVideo]?.title}
                                </span>
                            </h1>
                            <p className="text-lg">
                                <span className="text-yellow-500 " >
                                    Description:- {" "}
                                </span>
                                <span className="text-white">
                               {lectures && lectures[currentVideo]?.description}
                                </span>
                                
                            </p>
                        </div>
                   </div>

                   {/* right section for displaying list of lectres */}
                   <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                        <button 
                            className="    md:text-xl md:text-green-500 hidden md:block"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                            <p>Lectures list</p>
                            {role === "ADMIN" && (
                                <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                    Add new lecture
                                </button>
                            )}
                        </li> 
                        {lectures && 
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2 text-white" key={lecture._id}  >
                                        <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                            <span>
                                                {" "} Lecture {idx + 1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {console.log(`course id:-${state?._id} lecture id:-${lecture?._id}`)}
                                        {role === "ADMIN" && (
                                            <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm border-2">
                                                 Delete lecture
                                                 </button>
                                        )}
                                    </li>
                                )
                            })    
                        }
                   </ul>
                </div>) : (
                    role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", {state: {...state}})} className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                            Add new lecture
                        </button>
                    )
                )}
            </div>

        </HomeLayout>
    );
}

export default Displaylectures;