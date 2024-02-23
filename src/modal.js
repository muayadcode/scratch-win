// import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Modal = ({ content }) => {
	const [showModal, setShowModal] = useState();
	useEffect(() => {
		setShowModal(true);
	}, []);

	let back = (e) => {
		e.stopPropagation();
		setShowModal(false);
		// history.goBack();
	};

	if (showModal == false) {
		return null;
	}
	return (
		<div onClick={back} className='modalBackground'>
			<div className='modal' style={{}}>
				{content}
			</div>
		</div>
	);
};

export default Modal;
