import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting')

    const request = useCallback(
    async(
        url, 
        method = 'GET',
        body = null,
      ) => {
            
            setProcess('loading')

            try{
                const response = await fetch(url,
                    {
                        method,
                        body,
                        // headers
                    })
                if(!response.ok) throw new Error("ERROR")

                const data = await response.json()
                return data

            } catch(e){
                setProcess('error')
                throw e
            }

        }, [])

        const clearError = useCallback(() => {
            setProcess('loading')
        }, [])

        return{
            process,
            request,
            setProcess,
            clearError
        }
}