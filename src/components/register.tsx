import { useState } from 'react'
import '../style/register.css'
import NavbarComponent from './navbar'
import axios from 'axios';
import { BASE_URL } from './url';
import { register } from '../model/regsiterModel';
import Swal from 'sweetalert2';

export default function RegisterComponent() {
    const [student_id, setstudent_id] = useState("");
    const [student_name, setstudent_name] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirm_password, setconfirm_password] = useState("")

    function inputId(e:React.ChangeEvent<HTMLInputElement>) {
        setstudent_id(e.target.value)
    }
    function inputName(e:React.ChangeEvent<HTMLInputElement>) {
        setstudent_name(e.target.value)
    }
    function inputEmail(e:React.ChangeEvent<HTMLInputElement>) {
        setemail(e.target.value)
    }
    function inputPassword(e:React.ChangeEvent<HTMLInputElement>) {
        setpassword(e.target.value)
    }
    function inputConfirmPassword(e:React.ChangeEvent<HTMLInputElement>) {
        setconfirm_password(e.target.value)
    }
    function savedata(e:React.FormEvent) {
        e.preventDefault();
        //validate
        if (password !== confirm_password) {
            console.log("รหัสผ่านไม่ตรงกัน");
            return;
        }
        if(password.length < 8){
            console.log("ความยาวของรหัสผ่านสั้นเกินไป");
            return;
        }
        if (!student_id || !student_name || !email || !password) {
            console.log("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }
        let data:register = {student_id:student_id,student_name:student_name,email:email,password:password}
        console.log(data);
        axios.post(`${BASE_URL}/user/register`,data).then(response=>{
            Swal.fire({
                icon: 'success',
                title: 'ลงทะเบียนเรียบร้อย',
                showConfirmButton: false,
                timer: 1500
            })
            setstudent_id("")
            setstudent_name("")
            setemail("")
            setconfirm_password("")
            setpassword("")
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        }).catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ถูกต้อง',
                showConfirmButton: false,
                timer: 1500
            })
        })
        
    }

    return (
        <div className="register-container">
            <NavbarComponent />
            <div className="register">
                <form onSubmit={savedata}>
                    <h2>ลงทะเบียนสำหรับนักศึกษาใหม่ปี 2566</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">รหัสนักศึกษา</label>
                        <input type="text" className="form-control" aria-describedby="id" onChange={inputId} value={student_id}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">อีเมล</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" onChange={inputEmail} value={email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ชื่อ - นามสกุล</label>
                        <input type="text" className="form-control" aria-describedby="name" onChange={inputName} value={student_name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">รหัสผ่าน</label>
                        <input type="password" className="form-control" onChange={inputPassword} value={password}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">ยืนยันรหัสผ่าน</label>
                        <input type="password" className="form-control" onChange={inputConfirmPassword} value={confirm_password}/>
                    </div>
                    <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
                </form>
            </div>
        </div>
    )
}