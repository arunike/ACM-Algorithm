import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import {useEffect} from "react";
import axios from "axios";

const Dashboard = () => {

  // add a hook, see if user is authenticated
  // if not, redirect to login page
    useEffect(() => {
      // const id = localStorage.getItem('id')
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        window.location.href = '/login';
      }
      axios.post('http://127.0.0.1:8000/api/user/token/verify/', {
        token: token
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
        window.location.href = '/login';
      });
  }, []);

  return (
      <ApexChartWrapper>
      </ApexChartWrapper>
    )
}

export default Dashboard
