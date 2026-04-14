import {Link,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import "../styles/navbar.css";

function Navbar(){

const navigate = useNavigate()

const [menuOpen,setMenuOpen] = useState(false)

const closeMenu = ()=>{
setMenuOpen(false)
}

const [user,setUser] = useState(
JSON.parse(localStorage.getItem("user"))
)

useEffect(()=>{

const handleStorage = ()=>{
setUser(JSON.parse(localStorage.getItem("user")))
}

window.addEventListener("storage",handleStorage)

return ()=>window.removeEventListener("storage",handleStorage)

},[])

const logout=()=>{

localStorage.removeItem("user")
setUser(null)
setMenuOpen(false)   // important
navigate("/")

}

return(

<div className="navbar">

<h2 className="logo">SkillBridge</h2>

<div 
className="menu-toggle"
onClick={()=>setMenuOpen(!menuOpen)}
>
<span></span>
<span></span>
<span></span>
</div>

<div className={`nav-links ${menuOpen ? "active" : ""}`}>

<Link to="/" onClick={closeMenu}>Home</Link>

{user && (
<>
<Link to="/postservice" onClick={closeMenu}>Post Service</Link>
<Link to="/myservices" onClick={closeMenu}>My Services</Link>
<Link to="/profile" onClick={closeMenu}>Profile</Link>
</>
)}

<Link to="/about" onClick={closeMenu}>About</Link>

{!user ? (

<>
<Link to="/login" onClick={closeMenu}>Login</Link>
<Link to="/register" onClick={closeMenu}>Register</Link>
</>

) : (

<>
<span className="username">
👤 {user.name}
</span>

<button className="logout-btn" onClick={logout}>
Logout
</button>
</>

)}

</div>

</div>

)

}

export default Navbar