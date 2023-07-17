import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";

const useAuth = () => {
    const [data, setData] = useState(null);
    const { showBoundary } = useErrorBoundary();
    const api_url = process.env.REACT_APP_API_URL;

    useEffect(
        () => {
            (async () => {
                const statusRes = await fetch(
                    api_url + '/auth/get-status',
                    {
                        credentials : 'include'
                    }
                );
                const statusData = await statusRes.json();
                if (!statusRes.ok){
                    const error = new Error('You are not logged in.');
                    error.status = 403;
                    showBoundary(error) ;
                }else{
                    setData({userid : statusData.userid, first_name : statusData.first_name, last_name : statusData.last_name})
                }
            })()
        }
    ,[])

  return [data];
};

export default useAuth;;