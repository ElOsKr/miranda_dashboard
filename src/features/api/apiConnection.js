import fetch from 'cross-fetch';

const apiUrl = process.env.REACT_APP_API_URL;

let token;

if(localStorage.getItem('user')){
    token = (JSON.parse(localStorage.getItem('user'))).token    
}


export const apiCall = async (route,method,data = {}) => {
    try{
        let response;
        if(Object.keys(data).length === 0){
            response = await fetch(`${apiUrl}/${route}`,{
                method: method,
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }else{
            response = await fetch(`${apiUrl}/${route}`,{
                method: method,
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })            
        }

        const dataResponse = await response.json();
        return dataResponse.data;
    }catch(error){
        throw error
    }
}