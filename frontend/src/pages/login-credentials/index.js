import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


function LoginCredentials() {
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    let id = urlParams.get('id');
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    router.push(`http://127.0.0.1:3000/`);
  }, [router]);


  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}

export default LoginCredentials;
