import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const id = '';

function LoginCredentials() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams);

    const token = urlParams.get('token');
    id = urlParams.get('id');
    localStorage.setItem('token', token);
    console.log(token);
  }, []);

  router.push(`http://localhost:3000?id=${id}`);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default LoginCredentials;
