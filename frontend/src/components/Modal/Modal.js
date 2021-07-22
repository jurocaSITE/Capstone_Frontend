import "./Modal.css";
import React from "react";

function Modal({ children }) {
	return (
		<div className="Modal">
			<div class="modal-container" id="modal-opened">
				<div class="modal">
					<a href="#modal-closed" class="link-2 modal__btn">
						X
					</a>
					<div class="modal__details">
						<h1 class="modal__title">Add To</h1>
						<div class="modal__description">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
