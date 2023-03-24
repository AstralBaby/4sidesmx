import { API_TOKEN, Endpoints } from "@/lib/api"
import axios from "axios"
import { useEffect, useState } from "react"

type CountryState = {
    state_name: string,
}

export const useCountryStates = (country: string) => {
    const [countryStates, setCountryStates] = useState<CountryState[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (country) {
            console.log("current country is ", country)
            setIsLoading(true)

            axios.get(Endpoints.GET_COUNTRY_STATES + country, { headers: { Authorization: API_TOKEN } })
            .then(({ data }) => setCountryStates(data))
            .finally(() => setIsLoading(false))
        }
    }, [country])
    
    return { countryStates, isLoading }
}