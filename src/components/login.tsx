import NavbarComponent from "./navbar";
import '../style/login.css'
import { useState } from "react";
import { login } from "../model/loginModel";
import axios from "axios";
import { BASE_URL } from "./url";
import Swal from "sweetalert2";
export default function LoginComponent() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    function inputEmail(e:React.ChangeEvent<HTMLInputElement>) {
        setemail(e.target.value)
    }
    function inputPassword(e:React.ChangeEvent<HTMLInputElement>) {
        setpassword(e.target.value)
    }
    function savedata(e:React.FormEvent){
        e.preventDefault()
        let data:login = {email:email,password:password}
        axios.post(`${BASE_URL}/user/login`,data).then(res=>{
            const {token,student_id,student_name} = res.data;
            sessionStorage.setItem("token",token)
            sessionStorage.setItem("student_id",student_id)
            sessionStorage.setItem("student_name",student_name)
            Swal.fire({
                icon: 'success',
                title: 'เข้าสู่ระบบเรียบร้อย',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.href = "/course";
            }, 1600);
        }).catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className="login-container">
            <NavbarComponent />
               <div className="login">
                    <form onSubmit={savedata}>
                        <h2>เข้าสู่ระบบการลงทะเบียนปี 2566</h2>
                        <div>หากยังไม่มีบัญชี<a href="/register">คลิกที่นี่</a>เพื่อลงทะเบียน</div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">อีเมล</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={inputEmail}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">รหัสผ่าน</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={inputPassword}/>
                        </div>
                        <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
                    </form>
               </div>
        </div>
    )
}