import { apiClient } from "./utils/AxiosInterceptor"

export const GetAllExploreItems = async () => {
    return await apiClient.get(`explore`)
}
