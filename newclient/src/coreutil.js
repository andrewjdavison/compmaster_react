export function post(url, data){
  let postResponse={
    body: undefined,
    error:undefined,
  };

  let headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type','application/json');

  let config={
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };

  return fetch(url, config)
    .then((response) => {
      if(response.status !== 200){
        throw new Error(response.status);
      }
      return response.json();
    })
  .then((responseJSON)=>{
      postResponse.body = responseJSON;
      return postResponse;
    })
  .catch((error)=>{
    console.log('error');
    if(error.message===401){
      postResponse.error={
        code:401,
        summary:'Unauthorised'
      };
    }
    else {
      postResponse.error={
        code: error.message
      };
    }

    return postResponse;
  });
};


export function get(url){
  let postResponse={
    body: undefined,
    error:undefined,
  };

  let headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type','application/json');

  let config={
    method: 'GET',
    headers: headers,
  };

  return fetch(url, config)
    .then((response) => {
      if(response.status !== 200){
        throw new Error(response.status);
      }
      return response.json();
    })
  .then((responseJSON)=>{
      postResponse.body = responseJSON;
      return postResponse;
    })
  .catch((error)=>{
    console.log('error');
    if(error.message===401){
      postResponse.error={
        code:401,
        summary:'Unauthorised'
      };
    }
    else {
      postResponse.error={
        code: error.message
      };
    }

    return postResponse;
  });
};


