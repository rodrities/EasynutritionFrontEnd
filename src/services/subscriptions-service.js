import http from './http-common';

class SubscriptionsService {
    getAll() {
        return http.get('/subscriptions');
    }
    get(id) {
        return http.get(`/subscriptions/${id}`);
    }

    create(data) {
        return http.post("/subscriptions", data);
    }

    update(id, data) {
        return http.put(`/subscriptions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/subscriptions/${id}`);
    }

    deleteAll() {
        return http.delete(`/subscriptions`);
    }

    findByTitle(name) {
        return http.get(`/subscriptions?name=${name}`);
    }
}

export default new SubscriptionsService();
