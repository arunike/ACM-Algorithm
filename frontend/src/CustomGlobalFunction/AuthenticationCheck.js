import axios from "axios";

const AuthenticationCheckin = () => {
    const token = localStorage.getItem('token');

    if (!token){
      window.location.replace('/login');
    }
    
    axios.post('http://127.0.0.1:8000/api/user/token/verify/', {
      token: token
    }).then((resp) => {
    }).catch((err) =>{
      window.location.replace('/login');
    });
}

export default AuthenticationCheckin;

