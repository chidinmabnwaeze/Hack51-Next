import api from "../api"


export const catalogService = {
createRole: async (title:string , level:string , competencies: string) =>{
    const response = await api.post("/catalog/roles", { title, level, competencies })
    return response.data
}
}