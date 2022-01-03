import http from '../http-common';

class ListenedDataService {
    getAll() {
        return http.get("/listened");
    }

    get(date) {
        return http.get(`/listened/${date}`);
    }

    getCurrent() {
        return http.get("/listened/current");
    }

    create(data) {
        return http.post("/listened", data);
    }

    update(date, data) {
        return http.put(`/listened/${date}`, data);
    }

    delete(date) {
        return http.delete(`/listened/${date}`);
    }

    deleteAll() {
        return http.delete(`/listened`);
    }
}

export default new ListenedDataService();