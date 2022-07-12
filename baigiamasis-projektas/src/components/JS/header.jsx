import '../CSS/header.css'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Link } from 'react-router-dom';
import UserContext from '../JS/userContext'
import { useContext } from 'react';

const Header = () => {

    const user = useContext(UserContext)

    return (
        <header>
            <Link to={'/'}>
                <div className='HeaderIcon'>
                    <ViewHeadlineIcon />
                    <p>Stack <span>Overflow</span></p>
                </div>
            </Link>

            <form action="" className="searchBar">
                <input type="text" placeholder='Search...' />
            </form>
            <div className='HeaderUserInfo'>
                {user ? <Link to={'/'} className="profileLink">{user}</Link> : <><Link to={'/login'} className="profileLink">Log-in</Link> <Link to={'/register'} className="profileLink">Register</Link></> }
            </div>
        </header>
    );
}

export default Header;