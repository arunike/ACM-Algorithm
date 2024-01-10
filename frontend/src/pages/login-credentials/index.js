import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


function LoginCredentials() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');
    let id = urlParams.get('id');
    localStorage.setItem('token', token);
    console.log(token);
    router.push(`http://localhost:3000?id=${id}`);
  }, []);



  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default LoginCredentials;
