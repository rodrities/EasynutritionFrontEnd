import http from './http-common';

class SessionsService {
    getAll() {
        return http.get('/sessions');
    }
    get(id) {
        return http.get(`/sessions/${id}`);
    }

    create(data) {
        return http.post("/sessions", data);
    }

    update(id, data) {
        return http.put(`/sessions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/sessions/${id}`);
    }

    deleteAll() {
        return http.delete(`/sessions`);
    }

    findByTitle(name) {
        return http.get(`/sessions?name=${name}`);
    }
}

export default new SessionsService();
