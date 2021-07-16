import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "teca_token"
    }

    setToken(token) {
        this.token = token
    }

    async request({ endpoint, method = `GET`, data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch(error) {
            console.error({ errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error) }
        }
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials})
    } 

    async registerUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials})
    }

    async getBooksByKeyword(keyword) {
        return await this.request({ endpoint: `books/${keyword}`, method: `GET` })
    }

    async getBookById(id) {
        return await this.request({ endpoint: `books/id/${id}`, method: `GET` })
    }

    async getTopSellers() {
        return await this.request({ endpoint: `books/top/sellers`, method: `GET` })
    }

    async getTopSellerByName(title) {
        return await this.request({ endpoint: `books/top/sellers/${title}`, method: `GET` })
    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:5000")