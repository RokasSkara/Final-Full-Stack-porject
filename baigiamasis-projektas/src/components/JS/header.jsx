import '../CSS/header.css'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const Header = () => {
    let logged = false;
    return (
        <header>
            <div className='HeaderIcon'>
                <ViewHeadlineIcon />
                <p>Stack <span>Overflow</span></p>
            </div>
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