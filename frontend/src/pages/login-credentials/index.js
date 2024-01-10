import React, { useEffect } from 'react';

function LoginCredentials() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refresh = urlParams.get('refresh');
    console.log(token, refresh);

    // 在这里，您可以使用token和refresh token
    // 例如，将它们保存到状态或者发送到服务器
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
