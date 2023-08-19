import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 


const Navbar = () => {
    return ( 
        <div className= "Navbar">
            <div className="logo"><Link to="/">My Receipts</Link></div>
        <ul>

            
            <li><Link to="/">Old Receipts</Link></li>
            <li><Link to="/add">Add Receipts</Link></li>
            {/* <li><Link to="/logout"><FontAwesomeIcon icon={faSignOut} />logout</Link></li> */}
            {/* <li><Link to="/">Welcome</Link>
            </li> */}
            
            {/* <li><Link to="/login"><FontAwesomeIcon icon={faSignIn}  />
                            login</Link></li>

                            
                <li><Link to="/signup"><FontAwesomeIcon icon={faUserPlus}  />
                            signup</Link></li> */}
                </ul>
        </div>
     );
}
 
export default Navbar;