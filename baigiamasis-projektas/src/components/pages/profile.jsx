import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import UserContext from '../JS/userContext';
import '../CSS/profile.css'

const Profile = () => {

    const redirect = useNavigate()

    const logged = useContext(UserContext)

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/user', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    redirect('/')
                } else {
                    setUser(data)
                    console.log(data)
                }
            }
            )
            .catch(() => {
                setUser(null)
            })
    }, [])

    const Logout = () => {
        fetch('http://localhost:5000/logout', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                logged.setUser(null)
                redirect('/')
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }

    return (<>
        {user ?
            <div className='ProfileInfo'>
                <div>
                    <h4>Username: <span>{user[0].email}</span></h4>
                    <h4>Member since: <span>{user[0].regTime.slice(0, 10)}</span></h4>
                </div>
                <button onClick={() => Logout()} confirm={'Are you sure?'}>Logout</button>
            </div>
            :
            <>
                <h1>....</h1>
            </>}
    </>);
}

export default Profile; <>

</>