import '../CSS/header.css'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Link } from 'react-router-dom';
import UserContext from '../JS/userContext'
import { useContext, useEffect } from 'react';

const Header = () => {

    const { user } = useContext(UserContext)
    
    useEffect(() => {
        
    })



    return (
        <header>
            <Link to={'/'}>
                <div className='HeaderIcon'>
                    <ViewHeadlineIcon />
                    <h3>Stack <span>Overflow</span></h3>
                </div>
            </Link>
            <div>

            </div>

            <div className='HeaderUserInfo'>
                {user ? <><span>Username:</span> <Link to={'/profile'} className="profileLink">{user.username}</Link></>  : <><Link to={'/login'} className="profileLink">Log-in</Link> <Link to={'/register'} className="profileLink">Register</Link></>}
            </div>
        </header>
    );
}

export default Header;