import fetch from 'cross-fetch';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

let token;

if(localStorage.getItem('user')){
    token = (JSON.parse(localStorage.getItem('user'))).token
    console.log(token)    
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
        toast.error("Error connecting with the API, trying to reconnect", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        throw error
    }
}