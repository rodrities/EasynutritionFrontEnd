import http from './http-common';

class DietsService {
    getAll() {
        return http.get('/diets');
    }
    get(id) {
        return http.get(`/diets/${id}`);
    }

    create(data) {
        return http.post("/diets", data);
    }

    update(id, data) {
        return http.put(`/diets/${id}`, data);
    }

    delete(id) {
        return http.delete(`/diets/${id}`);
    }

    deleteAll() {
        return http.delete(`/diets`);
    }

    findByTitle(name) {
        return http.get(`/diets?name=${name}`);
    }
}

export default new DietsService();
