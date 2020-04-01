import Axios from 'axios';

export const sendGet = async (path, options) => {
    if(options === undefined) {
      options = {withCredentials: true, mode: 'no-cors',};
    }
    return Axios.get(path, options)
      .catch(err => {
        return {"error": err.response, "success": false}
      });
}
    
export const sendPut = async (path, data, options) => {
    return Axios.put(path, data, options)
    .catch(err => {
        return {"error": err.response, "success": false}
    });
}
    
export const sendPost = async (path, data, headers) => {
    if(headers === undefined) {
    headers = {withCredentials: true, mode: 'no-cors',};
    }
    return await Axios.post(path, data, headers)
    .catch(err => {
        return {"error" : err.response, "success": false}
    })
}
    
export const sendDelete = async (path, options) => {
    if(options === undefined) {
    options = {withCredentials: true};
    }
    return await Axios.delete(path, options)
    .catch(err => {
        return {"error" : err.response, "success": false}
    })
}