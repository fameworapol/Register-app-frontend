import '../style/courseitems.css'
import {AiFillCheckSquare} from 'react-icons/ai'

export default function CourseItem(props:any){
    return (
        <div className="course_card">
            <div className='course'>
                <p>{props.course_id}</p>
                <p>{props.course_name}</p>
            </div>
            <div className='open'>
                <p>open</p>
                <p>{props.open}</p>
            </div>
            <AiFillCheckSquare size={'40px'} style={{marginLeft:'10px',cursor:'pointer'}}/>
        </div>
    )
}