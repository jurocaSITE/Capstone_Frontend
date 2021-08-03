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

	async getBooksInList(list_id) {
		return await this.request({
			endpoint: `books/my-lists/${list_id}`,
			method: `GET`,
		});
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

	async editUserProfile(credentials) {
		return await this.request({
			endpoint: `auth/update-personal-information`,
			method: `PUT`,
			data: credentials,
		});
	}

	async changeUserUsername(credentials) {
		return await this.request({
			endpoint: `auth/change-username`,
			method: `PUT`,
			data: credentials,
		});
	}

	async changeUserEmail(credentials) {
		return await this.request({
			endpoint: `auth/change-email`,
			method: `PUT`,
			data: credentials,
		});
	}

	async changeUserPassword(credentials) {
		return await this.request({
			endpoint: `auth/change-password`,
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

	async recoverAccount(email) {
		const em = email.email;
		return await this.request({
			endpoint: `auth/recover`,
			method: `POST`,
			data: { em },
		});
	}

	async resetPassword({ token, newPassword }) {
		return await this.request({
			endpoint: `auth/password-reset?token=${token}`,
			method: `POST`,
			data: { newPassword },
		});
	}

	async getAllListsByUserId() {
		return await this.request({
			endpoint: `lists/get-all-lists`,
			method: `GET`,
		});
	}

	async createList(credentials) {
		return await this.request({
			endpoint: `lists/create-new-list`,
			method: `POST`,
			data: credentials,
		});
	}

	async editList(list_id, credentials) {
		return await this.request({
			endpoint: `lists/edit/${list_id}`,
			method: `PUT`,
			data: credentials,
		});
	}

	async deleteList(list_id) {
		return await this.request({
			endpoint: `lists/delete/${list_id}`,
			method: `DELETE`,
		});
	}

	async addBookToList(bookId, listId) {
		return await this.request({
			endpoint: `lists/${listId}/add-book/${bookId}`,
			method: `POST`,
		});
	}

	async getRatingsForBook(book_id) {
		return await this.request({
			endpoint: `ratings/book/${book_id}`,
			method: `GET`,
		});
	}

	async getCurrentlyReadingListByUserId(user) {
		return await this.request({
			endpoint: `lists/get-currently-reading`,
			method: `GET`,
		});
	}

	async createNewRatingForBook(book_id, rating) {
		return await this.request({
			endpoint: `ratings/${book_id}`,
			method: `POST`,
			data: rating,
		});
	}

	async updateRatingForBook(rating_id, update_body) {
		return await this.request({
			endpoint: `ratings/${rating_id}`,
			method: `PATCH`,
			data: update_body,
		});
	}

	async deleteRatingForBook(rating_id) {
		return await this.request({
			endpoint: `ratings/${rating_id}`,
			method: `DELETE`,
		});
	}

	async getListNameById(list_id) {
		return await this.request({
			endpoint: `lists/get-list-name/${list_id}`,
			method: `GET`,
		});
	}

	async getListContents(list_id) {
		return await this.request({
			endpoint: `lists/${list_id}/books`,
			method: `GET`,
		});
	}
}

export default new ApiClient(
	process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:5000"
);
