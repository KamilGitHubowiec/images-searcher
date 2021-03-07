import axios from "axios"
import { getPhotosUrl } from "../../helpers/API";

export const listPhotos = (query: string, page: number) => async (dispatch: any) => {
    try {
        dispatch({ 
            type: "PHOTOS_REQUEST"
        })

        const url = getPhotosUrl(query, page);
        const { data } = await axios.get(url);    

        dispatch({
            type: "PHOTOS_SUCCESS",
            payload: data
        })

    } catch (error) {

        dispatch({
            type: "PHOTOS_FAIL",
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}