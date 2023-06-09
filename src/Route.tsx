import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import './App.css'
import LoginComponent from "./components/login"
import CourseComponent from "./components/course"
import EnrolledComponent from "./components/enrolled"
import RegisterComponent from "./components/register"

export default function Router(){
    return (
        <div className="route">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/course' element={<CourseComponent/>}/>
                    <Route path='/enrolled' element={<EnrolledComponent/>}/>
                    <Route path='/register' element={<RegisterComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}