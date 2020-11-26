import http from './http-common';

class ExperiencesService {
    getAll() {
        return http.get('/experiences');
    }
    get(id) {
        return http.get(`/experiences/${id}`);
    }

    create(data) {
        return http.post("/experiences", data);
    }

    update(id, data) {
        return http.put(`/experiences/${id}`, data);
    }

    delete(id) {
        return http.delete(`/experiences/${id}`);
    }

    deleteAll() {
        return http.delete(`/experiences`);
    }

    findByTitle(name) {
        return http.get(`/experiences?name=${name}`);
    }
}

export default new ExperiencesService();
