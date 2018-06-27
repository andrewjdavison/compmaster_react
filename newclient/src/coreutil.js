export const Capabilities = {
  authMod:  1,
  userMod:  2,
  entryRead:4,
  entryMod: 8,
  compMod:  16,
  compRead: 32,
  compReportFinancial: 64,
  compReportOperations: 128,
  compReportJudging:  256,
  compModifyScores: 512,
  compRefundEntries: 1024,
  sysReadUserList: 2048,
  sysArchiveComp: 4096,
  sysCreateUser: 8162,
  sysSystemActions: 16384,
  sysTest: 32786
}

export const CompState = {
  active: 1,
  acceptingEntries: 2,
  paused: 3,
  closedEntries: 4,
  running: 5,
  finished: 6,
  published: 7,
  completed: 8,
  closed: 16,

}

export const EntryType = {
  fullPrice: 1,
  clubDiscount: 2,
  online: 4,
  offline: 8,
  test: 16,
  multiEntry: 32

}

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


export function get(url, token){
  let postResponse={
    body: undefined,
    error:undefined,
  };

  let headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type','application/json');
  if(token != undefined){
    headers.append('Authorization', 'Bearer '+token);
  }

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


