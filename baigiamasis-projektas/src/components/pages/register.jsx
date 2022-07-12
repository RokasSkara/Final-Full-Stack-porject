import { useNavigate } from 'react-router-dom'
import '../CSS/LoginRegPage.css'

const RegisterForm = () => {
    const redirect = useNavigate()


    const RegisterForm = (e) => {
        e.preventDefault()
        const login = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        e.target.elements.email.value = ''
        e.target.elements.password.value = ''
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
            .then(response => response.json())
            .then(data => {
                if (data.changes !== 1) return alert('Email or password is not valid')
                else {
                    alert('Registration succesfull, you will be redirected to Login window soon')
                    setTimeout(() => redirect('/login'), 1000)
                };
            })
            .catch(err => { return alert(err) })

    }

    return (
        <form onSubmit={RegisterForm} className="LogNRegForm">
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" minLength={8} title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
            <input type="submit" value={"Register"} />
        </form>
    );
}

export default RegisterForm;