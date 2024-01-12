import axios from "axios";
import {Null} from "mdi-material-ui";

// assume user is authenticated
function GetUserInfo(){
    const token = localStorage.getItem('token');
    const acmId = localStorage.getItem('id');
    let user = Null;

    axios.get(`http://127.0.0.1:8000/api/user/user/${acmId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((resp) => {
      // TODO: set user by user = resp.data, then return the user
    }).catch((err) =>{
      // TODO: toast: id is invalid
      window.location.replace('/login');
    });

  }

  export default GetUserInfo

