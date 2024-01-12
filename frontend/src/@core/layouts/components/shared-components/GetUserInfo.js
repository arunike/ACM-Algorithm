import axios from "axios";

async function GetUserInfo(){
  const token = localStorage.getItem('token');
  const acmId = localStorage.getItem('id');

  try {
      const resp = await axios.get(`http://127.0.0.1:8000/api/user/user/${acmId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      // console.log(resp.data);
      return resp.data;
  } catch(err) {
      // TODO: toast: id is invalid
      window.location.replace('/login');
  }
}

export default GetUserInfo

