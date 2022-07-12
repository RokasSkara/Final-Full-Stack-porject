import '../CSS/header.css'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Link } from 'react-router-dom';

const Header = () => {
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
                <a href="" className="profileLink">You</a>
            </div>
        </header>
    );
}

export default Header;