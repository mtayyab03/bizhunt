async function apicall(url = '', method,data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
        'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  async function apicallget(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id':'QoUxFBYv7fEcUn8BsrLddggywVQ6UPb4H91HXoex',
        'X-Parse-REST-API-Key':'6QRsnnBAQF6FicxlT8uxY8He0kSmK0vsCBLtxpNS'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
     });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const apifunction=async(url,method,body={})=>{
    apicall(url, method,body)
    .then((data) => {
      return data // JSON data parsed by `data.json()` call
    }).catch((e)=>{
      console.log(e.message)
    })
  }
  export const apifunctionGET=async(url)=>{
    let res=null
    apicallget(url)
    .then((data) => {
        res=data // JSON data parsed by `data.json()` call
    }).catch((e)=>{
      console.log(e.message)
    })
    return res
  }
  
  export default apifunction
  