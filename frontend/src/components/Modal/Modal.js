import "./Modal.css";
import React from "react";

function Modal({ children, id="modal-opened"}) {
	return (
		<div className="Modal">
			<div className="modal-container" id={id}>
				<div className="modal">
					<a href="#modal-closed" className="link-2 modal__btn">
						X
					</a>
					<div className="modal__details">
						<h1 className="modal__title">Add To</h1>
						<div className="modal__description">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
