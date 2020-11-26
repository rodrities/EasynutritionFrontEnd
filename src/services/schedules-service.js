import http from './http-common';

class SchedulesService {
    getAll() {
        return http.get('/schedules');
    }
    get(id) {
        return http.get(`/schedules/${id}`);
    }

    create(data) {
        return http.post("/schedules", data);
    }

    update(id, data) {
        return http.put(`/schedules/${id}`, data);
    }

    delete(id) {
        return http.delete(`/schedules/${id}`);
    }

    deleteAll() {
        return http.delete(`/schedules`);
    }

    findByTitle(name) {
        return http.get(`/schedules?name=${name}`);
    }
}

export default new SchedulesService();
