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
    if(options === undefined) {
        options = {withCredentials: true, mode: 'no-cors',};
    }
    return Axios.put(path, data, options)
    .catch(err => {
        return {"error": err.response, "success": false}
    });
}
    
export const sendPost = async (path, data, headers, onProgress = false) => {
    if(headers === undefined || headers === null) {
        headers = {withCredentials: true, mode: 'no-cors'};
    }
    if(onProgress) {
        headers.onUploadProgress = (progressEvent) => {
            if (progressEvent.lengthComputable) {
                onProgress(progressEvent);
             }
        }
    }
    return await Axios.post(path, data, headers)
    .catch(err => {
        return {"error" : err.response, "success": false}
    })
}
    
export const sendDelete = async (path, data, headers) => {
    if(headers === undefined) {
        headers = {withCredentials: true, mode: 'no-cors', data};
    }
    return await Axios.delete(path, headers)
    .catch(err => {
        return {"error" : err.response, "success": false}
    })
}