import { Endpoints } from "@/lib/api"
import axios from "axios"
import { useEffect, useState } from "react"

type Weather = {
    temp_c: number,
    condition: {
        icon: string
    }
}

export const useWeather = () => {
    const [location, setLocation] = useState<{latitude: number, longitude: number}>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<Weather>()

    const fetchWeather = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude
            })
        })
    }

    useEffect(() => {
        if (location) {
            setIsLoading(true)
            const params = `&q=${location.latitude},${location.longitude}`
            
            axios.get(Endpoints.GET_WEATHER_BY_COORDS + params)
            .then(({ data }) => setWeather(data.current))
            .finally(() => setIsLoading(false))
        }
    }, [location])

    return { fetchWeather, weather, isLoading }
}