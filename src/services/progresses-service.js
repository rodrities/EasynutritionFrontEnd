import http from './http-common';

class ProgressesService {
    getAll() {
        return http.get('/progresses');
    }
    get(id) {
        return http.get(`/progresses/${id}`);
    }

    create(data) {
        return http.post("/progresses", data);
    }

    update(id, data) {
        return http.put(`/progresses/${id}`, data);
    }

    delete(id) {
        return http.delete(`/progresses/${id}`);
    }

    deleteAll() {
        return http.delete(`/progresses`);
    }

    findByTitle(name) {
        return http.get(`/progresses?name=${name}`);
    }
}

export default new ProgressesService();
