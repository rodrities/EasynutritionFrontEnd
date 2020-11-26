import http from './http-common';

class ComplaintsService {
    getAll() {
        return http.get('/complaints');
    }
    get(id) {
        return http.get(`/complaints/${id}`);
    }

    create(data) {
        return http.post("/complaints", data);
    }

    update(id, data) {
        return http.put(`/complaints/${id}`, data);
    }

    delete(id) {
        return http.delete(`/complaints/${id}`);
    }

    deleteAll() {
        return http.delete(`/complaints`);
    }

    findByTitle(name) {
        return http.get(`/complaints?name=${name}`);
    }
}

export default new ComplaintsService();
