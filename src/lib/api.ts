import axios from "axios"

export enum Endpoints {
    GET_COUNTRY_STATES = "https://www.universal-tutorial.com/api/states/",
    GET_WEATHER_BY_COORDS = "http://api.weatherapi.com/v1/current.json?key=2e888c6343c24311abd214709232303",
    GET_ACCESS_TOKEN = "https://www.universal-tutorial.com/api/getaccesstoken"
}

// should be in .env
export const API_USER = "astralbaby.4sidesmx@github.com" 
export const API_TOKEN = "2IvW3Bvmyop2_tXHo6FgePJeS5BdFEHz3lFKtVU_XYHQ5Tn4_oljobu2ISJm0RnA4Bw"

export const getAccessToken = () => axios.get(Endpoints.GET_ACCESS_TOKEN, {headers: {
    Accept: "application/json",
    "api-token": API_TOKEN,
    "user-email": API_USER
}})