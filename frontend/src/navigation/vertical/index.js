import Logout from 'mdi-material-ui/Logout';
import HomeOutline from 'mdi-material-ui/HomeOutline';
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';
import {useEffect, useState} from "react";

const Navigation = () => {
  const [id, setId] = useState(0);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    setId(Number(idFromUrl));
  }, []);

  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: 'error',
      openInNewTab: true
    },
    {
      title: 'Logout',
      icon: Logout,
      path: 'login',
    },
  ]
}

export default Navigation;
