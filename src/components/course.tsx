import NavbarComponent from "./navbar";
import '../style/course.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./url";
import CourseItem from "./courseItem";



interface course{
    course_id: string
    course_name: string
    id: string
    open:number
}

export default function CourseComponent() {
    const [allCourse, setallCourse] = useState<course[]>([])
    useEffect(() => {
        let token = "";
        if (sessionStorage.getItem("token")) {
            token = sessionStorage.getItem("token")!
        }
        axios.get(`${BASE_URL}/course/getCourse`,{headers:{Authorization:`Bearer ${token}`}}).then(response=>{
            setallCourse(response.data)
        }).catch(err=>{
            console.log(err);
        })
    }, [])
    console.log(allCourse);
    
    return  (
        <div className="course-container">
            <NavbarComponent/>
            <div className="course">
                {allCourse.map((elm)=>{
                    return <CourseItem key={elm.id} course_id={elm.course_id} course_name={elm.course_name} id={elm.id} open={elm.open}/>
                })}
            </div>
        </div>
        )
}