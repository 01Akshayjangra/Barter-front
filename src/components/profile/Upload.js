import "./css/Upload.css"
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import ImageIcon from '@mui/icons-material/Image';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Modal from '@mui/material/Modal';
import UploadDes from "./UploadDes";

const Upload = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [image, setImage] = React.useState("");
	const imageRef = React.useRef("null");

	function useDisplayImage() {
		const [result, setResult] = React.useState(false);

		function uploader(e) {
			const imageFile = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener("load", (e) => {
				setResult(e.target.result);
			});

			reader.readAsDataURL(imageFile);
		}

		return { result, uploader };
	}

	const { result, uploader } = useDisplayImage();
	return (
		<>
			<div className="upload__mainBox">

				<div className="upload__left">
					{/* left -1 */}

					<div className="upload__leftContent">
						<div className="upload__leftHead">
							<p>Upload Options</p>
						</div>
						<ul>
							<li>
								<div className="upload__leftIcons">
									<input type="file" name="image" onChange={(e) => {
										setImage(e.target.files[0]);
										uploader(e);
									}} />
									<ImageIcon />
									<p>Image</p>
								</div>
							</li>

							<li >
								<div className="upload__leftIcons" onClick={handleOpen}>
									<SettingsSharpIcon />
									<p>Settings</p>
								</div>

							</li>
							<li >
								<div className="upload__leftIcons" onClick={handleOpen}>
									<ArrowForwardIosIcon />
									<p >Continue</p>
								</div>

							</li>

						</ul>
					</div>
				</div>

				<div className="upload__right">

					{result ? <img ref={imageRef} src={result} alt="" /> : <><h1>Upload Image:</h1>
						<div className="upload__rightContent">

							<div className="upload__rightIcons">
								<div className="upload__rightInner">
									<input type="file" name="image" onChange={(e) => {
										setImage(e.target.files[0]);
										uploader(e);
									}} />
									<ImageIcon />
								</div>
								<h1>Image</h1>
								<h6>Post size must be less than 75kb </h6>
							</div>
						</div></>}
				</div>

				<Modal
					open={open}
					onClose={handleClose}

				>
					<div className="upload__modal">
						<UploadDes refImg={imageRef} srcImg={result} result={result} setImage={setImage} uploader={uploader}/>
					</div>
				</Modal>
			</div>
		</>
	)
}

export default Upload

