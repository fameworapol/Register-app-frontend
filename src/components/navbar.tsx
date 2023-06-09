import { useEffect, useState } from 'react'
import '../style/navbar.css'
import Swal from 'sweetalert2';
import { icons } from 'react-icons';

export default function NavbarComponent() {
    const [name, setname] = useState("");
    useEffect(() => {
        if (sessionStorage.getItem("student_name")) {
            setname(sessionStorage.getItem("student_name")!)
        }
    }, [])
    function logout() {
        let name = sessionStorage.getItem("student_name")
        Swal.fire({
            title: 'คุณต้องการออกจากระบบใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่ , ออกจากระบบ'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title:'ออกจากระบบเรียบร้อยแล้ว',
                icon:"success",
            })
            }
            if(name){
                sessionStorage.clear();
            }
            setTimeout(() => {
                window.location.href = "/"
            }, 1500);
          })
    }
    return (
        <div className="navbar-container">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "20vw" ,height:'100%'}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                    <span className="fs-4" style={{fontWeight:'bolder'}}>Register</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/course" className="nav-link text-white" aria-current="page">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
                            Course
                        </a>
                    </li>
                    <li>
                        <a href="/enrolled" className="nav-link text-white ">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                            Enrolled
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{name}</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        {name ? <li><a className="dropdown-item" href="#" onClick={logout}>Sign out</a></li> : <li><a className="dropdown-item" href="/">Login</a></li>}
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}