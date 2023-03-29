import { Endpoints, getAccessToken } from "@/lib/api"
import axios from "axios"
import { useEffect, useState } from "react"

type CountryState = {
    state_name: string,
}

export const useCountryStates = (country: string) => {
    const [countryStates, setCountryStates] = useState<CountryState[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getOrRefreshToken = () => {
        setIsLoading(true)
        
        return getAccessToken()
        .then(({ data }) => localStorage.setItem("token", "Bearer: " + data.auth_token))
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setIsLoading(true)
            getOrRefreshToken()
        }
    }, [])

    useEffect(() => {
        if (country) {
            setIsLoading(true)

            axios.get(Endpoints.GET_COUNTRY_STATES + country, { headers: { Authorization: localStorage.getItem("token") } })
            .then(({ data }) => setCountryStates(data))
            .catch(({ config }) => getOrRefreshToken().then(() => axios(config)))
            .finally(() => setIsLoading(false))
        }
    }, [country])
    
    return { countryStates, isLoading }
}