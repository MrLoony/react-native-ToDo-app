export class Http {
    static HEADERS = { 'Content-Type': 'application/json' }
    
    static async get(url) {
        request(url, 'GET')
    }
    
    static async post(url, data = {}) {
        request(url, 'POST', data)
    }

    static async delete(url) {
        request(url, 'DELETE')
    }

    static async patch(url, data = {}) {
        request(url, 'PATCH', data)
    }
}

async function request(url, method = 'GET', data) {
    const config = {
        method,
        headers: Http.HEADERS
    }

    if (method === 'POST' || method === 'PATCH') {
        config.body = JSON.stringify(data)
    }
    const response = await fetch(url, config)
    return await response.json()
}