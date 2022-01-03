import http from '../http-common';

class AlbumDataService {
    getAll() {
        return http.get("/albums");
    }

    get(id) {
        return http.get(`/albums/${id}`);
    }

    getCurrent() {
        return http.get("/albums/current");
    }

    create(data) {
        return http.post("/albums", data);
    }

    update(id, data) {
        return http.put(`/albums/${id}`, data);
    }

    delete(id) {
        return http.delete(`/albums/${id}`);
    }

    deleteAll() {
        return http.delete(`/albums`);
    }

    findBySlug(slug, id) {
        return http.get(`/albums?slug=${slug}&id=${id}`);
    }

    findByTitleAndArtist(title, artist) {
        title = title.replace("'", "");
        artist = artist.replace("'", "");
        return http.get(`albums?title=${title}&artist=${artist}`);
    }
}

export default new AlbumDataService();