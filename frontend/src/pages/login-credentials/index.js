import React, { useEffect } from 'react';

function LoginCredentials() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    const token = urlParams.get('token');
    console.log(token);


  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default LoginCredentials;
