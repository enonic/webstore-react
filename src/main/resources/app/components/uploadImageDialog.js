import React from 'react';

// Material UI 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';

// Interfaces 
import Image from '../interfaces/image'; 

// Stylesheets
import '../styles/uploadImageDialog.less';



export default class UploadImageDialog extends React.PureComponent {
	constructor(arg) {
		super(arg);
		this.state = {
			name: this.props.image ? this.props.image.name : '', 
			source: this.props.image ? this.props.image.source : '', 
			file: null,
			validationFailed: false 
		};
	}

	componentWillReceiveProps(props){
		if(props.image) {
			this.setState({name: props.image.name, source: props.image.source});
		} else {
			this.setState({name: '', source: ''});
		}
	}

	handleUpload() {
		if(!this.state.source) {
			this.setState({validationFailed : true}); 
			return; 
		} 
		this.setState({
			validationFailed : false
		});

		this.props.onUpload(new Image({
			name : this.state.name, 
			source : this.state.source,
			file : this.state.file
		})); 
		this.props.onClose();
	}

	handleEdit(){
		this.props.edit({
			name : this.state.name, 
			file: this.state.file,
			source : this.state.source,
			id: this.props.image.id, 
			edited : true
		} );
		this.props.onClose();
	}
	handleNameChange(event) {
		this.setState({
			name : event.target.value
		});
	}

	handleFileChange(event) {
		const file = event.target.files[0];
		const blob = new Blob([file], {type: file.type}); //converting to "Blob" since repo can't handle "File"
		this.setState({
			file: blob,
			name: file.name,
			source: URL.createObjectURL(file)
		});
	}

	renderButton(){

		return this.props.image ? 
			<Button 
				onClick={this.handleEdit.bind(this)} 
				color="primary">
                Save
			</Button>
			:
			<Button 
				disabled={this.state.source == '' || this.state.name == '' ? true : false}
				onClick={this.handleUpload.bind(this)} 
				color="primary">
                Upload
			</Button>;
	}

	renderMedia(){
		if (this.state.source != ''){
			return <label htmlFor="raised-button-file">
				<CardMedia
					image={this.state.source}
					className="Item-Card-Media"
				/>
			</label>; 
		}
	}

	render() {
		return <Dialog
			open={this.props.open}
			onClose={this.props.handleClose}
			aria-labelledby="form-dialog-title"
		>
			<div className="UploadImageDialog">
				
				<DialogTitle id="form-dialog-title">Upload image</DialogTitle>
				<DialogContent>
					<TextField
						required
						autoFocus
						margin="dense"
						id="name"
						label="Image Name"
						type="text"
						value={this.state.name}
						onChange={this.handleNameChange.bind(this)}
						fullWidth
					/>
					<input
						accept="image/*"
						id="raised-button-file"
						type="file"
						onInput={this.handleFileChange.bind(this)}
						className="UploadImageDialog-FileInput"
						required
					/>
					{this.renderMedia()}
					<label htmlFor="raised-button-file">
						<Button
							color={this.state.validationFailed ? 'secondary' : 'primary'}
							component="span"
						>
							Select Image 
						</Button>
					</label>
				</DialogContent>
				<DialogActions>
					<Button 
						onClick={this.props.onClose} 
						className="Greyed-Button"
					>
						Cancel
					</Button>
					{this.renderButton()}
				</DialogActions>
			</div>
		</Dialog>;
	}
}
