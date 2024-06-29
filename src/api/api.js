import axios from "axios"
import { base_url } from "../constant"

let get_api = async (endpoint) => {

    let result = await axios.get(base_url + endpoint)
    return result

}

let post_api = async (endpoint, product) => {

    let result = await axios.post(base_url + endpoint, product)
    return result

}

let Delete_api = async (endpoint, id) => {

    let result = await axios.delete(base_url + endpoint, id)
    return result

}

let Update_api = async (endpoint, product) => {

    let result = await axios.put(base_url + endpoint, product)
    return result

}
export { get_api, post_api, Delete_api, Update_api }


