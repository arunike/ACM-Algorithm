import axios from "axios";

async function GetUserInfo(){
  const token = localStorage.getItem('token');
  const acmId = localStorage.getItem('id');

  const resp = await axios.get(`http://127.0.0.1:8000/api/user/user/${acmId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

  return resp.data;
}

export default GetUserInfo

