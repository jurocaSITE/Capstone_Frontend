import axios from "axios";

class ApiClient {
	constructor(remoteHostUrl) {
		this.remoteHostUrl = remoteHostUrl;
		this.tokenName = "teca_token";
		this.token = localStorage.getItem(this.tokenName);
	}

	setToken(token) {
		this.token = token;
		localStorage.setItem(this.tokenName, token);
	}

	async request({ endpoint, method = `GET`, data = {} }) {
		const url = `${this.remoteHostUrl}/${endpoint}`;

		const headers = {
			"Content-Type": "application/json",
		};

		if (this.token) {
			headers["Authorization"] = `Bearer ${this.token}`;
		}

		try {
			const res = await axios({ url, method, data, headers });
			return { data: res.data, error: null };
		} catch (error) {
			console.error({ errorResponse: error.response });
			const message = error?.response?.data?.error?.message;
			return { data: null, error: message || String(error) };
		}
	}

	async fetchUserFromToken() {
		return await this.request({ endpoint: `auth/me`, method: `GET` });
	}

	async loginUser(credentials) {
		return await this.request({
			endpoint: `auth/login`,
			method: `POST`,
			data: credentials,
		});
	}

	async logoutUser() {
		this.setToken(null);
		localStorage.setItem(this.tokenName, "");
	}

	async registerUser(credentials) {
		return await this.request({
			endpoint: `auth/register`,
			method: `POST`,
			data: credentials,
		});
	}

	async getBooksByKeyword(keyword, offset = 0) {
		return await this.request({
			endpoint: `books/search/${keyword}/${offset}`,
			method: `GET`,
		});
	}

	async getBookById(id) {
		return await this.request({ endpoint: `books/id/${id}`, method: `GET` });
	}

	async getTopSellers() {
		return await this.request({ endpoint: `books/top-sellers`, method: `GET` });
	}

	async getTopSellerByName(title) {
		return await this.request({
			endpoint: `books/top-sellers/${title}`,
			method: `GET`,
		});
	}

	async getBooksInList(list_id) {
		return await this.request({
			endpoint: `books/my-lists/${list_id}`,
			method: `GET`,
		});
	}

	async getTopSellerByName(title) {
		return await this.request({
			endpoint: `books/top-sellers/${title}`,
			method: `GET`,
		});
	}

	async getListContents(list_id) {
		return await this.request({
			endpoint: `lists/${list_id}/books`,
			method: `GET`,
		});
	}

	async getListNameById(list_id) {
		return await this.request({
			endpoint: `lists/get-list-name/${list_id}`,
			method: `GET`,
		});
	}

	async editUserProfile(credentials) {
		return await this.request({
			endpoint: `auth/update-personal-information`,
			method: `PUT`,
			data: credentials,
		});
	}

	async deleteUserProfile() {
		await this.request({
			endpoint: `auth/delete-account`,
			method: `DELETE`,
		});

		this.logoutUser();
	}

	async getAllListsByUserId() {
		return await this.request({
			endpoint: `lists/get-all-lists`,
			method: `GET`,
		});
	}

	async deleteList(list_id) {
		return await this.request({
			endpoint: `lists/delete/${list_id}`,
			method: `DELETE`,
		});
	}

	async editList(list_id, credentials) {
		return await this.request({
			endpoint: `lists/edit/${list_id}`,
			method: `PUT`,
			data: credentials,
		});
	}

	async createList(credentials) {
		return await this.request({
			endpoint: `lists/create-new-list`,
			method: `POST`,
			data: credentials,
		});
	}

	async addBookToList(bookId, listId) {
		return await this.request({
			endpoint: `lists/${listId}/add-book/${bookId}`,
			method: `POST`,
		});
	}
}

export default new ApiClient(
	process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:5000"
);
