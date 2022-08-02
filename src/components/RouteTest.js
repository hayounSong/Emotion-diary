import { Link } from "react-router-dom"

const RouteTest =()=>{

    return <>
    <Link to={'/'}>Home</Link>
    <br></br>
    <Link to={'/new'}>New</Link>
    <br></br>
    <Link to={'/diary'}>diary</Link>
    <br></br>
    <Link to={'/edit'}>Edit</Link>
    </>
}

export default RouteTest