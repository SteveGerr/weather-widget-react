import { useState, useCallback } from 'react';

export const useRequests = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [process, setProcess] = useState('waiting')

    const request = useCallback(async(url, method='GET', headers = {'Content-type': 'application/json'}) => {

        setLoading(true)
        setProcess('loading')

        try {

            const response = await fetch(url, {method, headers})

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status ${response.status}`)
            }

            const data = await response.json()

            setLoading(false)

            return data

        } catch (error) {

            if (error instanceof Error) {
                setLoading(false)
                setError(error.message)
                setProcess('error')
                throw error
            }
        }

    }, [])

    const clearError = useCallback(() => {
        setError("")
        setProcess('loading')
    }, [])

    return {loading, request, error, clearError, process, setProcess}
}

