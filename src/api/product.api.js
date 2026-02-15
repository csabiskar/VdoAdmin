import API from "./axiosInstance";

export const addProducts = async (data)=>{
    try {
        const res = await API.post('/products',data)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}