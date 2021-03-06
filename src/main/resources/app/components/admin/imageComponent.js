
import React from 'react';

// Components
import ImageListComponent from './imageListComponent';
import SearchComponent from '../searchComponent';
import DialogComponent from '../dialogComponent';
import UploadImageDialog from '../uploadImageDialog';
import SaveCancel from './saveCancelButtonComponent';

// Material UI
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead'; 
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell'; 
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button'; 



export default class ImageComponent extends React.PureComponent {
	constructor(arg){
		super(arg);
		this.state = {
			uploadImageDialogVisible : false, 
			name:  '',
			image: null,
			searchValue: '',
			imageToBeRemoved: null,
			imageToBeEdited: null,
			open: false
		};
	}

	searchimageOnChange(value){
		this.setState({
			searchValue : value
		});
	}

	toggleUploadImageDialog() { 
		this.setState({
			uploadImageDialogVisible : !this.state.uploadImageDialogVisible
		}, () => {
			if(!this.state.uploadImageDialogVisible){
				this.setState({imageToBeEdited: null});
			}
		});
	}

	toggleDeleteDialog(type, image){
		if(type){
			this.setState({ dialogType: type, open: true, imageToBeRemoved: image});
		} else {

			this.setState({ dialogType: '', open: false});
		}
	}

	editimage(image){
		this.setState({imageToBeEdited: image}, () =>
			this.toggleUploadImageDialog()
		);
	}

	handleImageUpload(image, file) {
		this.setState({
			image : image.source
		}); 
		this.props.addImage(image, true); 
	}

	render(){ 
		return (
			<div>
				<UploadImageDialog
					open={this.state.uploadImageDialogVisible}
					onClose={this.toggleUploadImageDialog.bind(this)}
					onUpload={this.handleImageUpload.bind(this)}
					image={this.state.imageToBeEdited}
					edit={this.props.editImage}
				/>
				<DialogComponent 
					type= {this.state.dialogType} 
					onClose={this.toggleDeleteDialog.bind(this)}
					open = {this.state.open} 
					remove={this.props.deleteImage}
					toBeRemoved={this.state.imageToBeRemoved}
					openToaster={this.props.openToaster} 
					message={this.state.imageToBeRemoved ? this.state.imageToBeRemoved.name :  ''}
				/>

				<Typography variant="display3" gutterBottom>
                    Images
				</Typography>

				<SearchComponent 
					value={this.state.searchValue} 
					onChange={this.searchimageOnChange.bind(this)}
					helperText="Filter images"/>
				<div className="admin-button-container">
					<div className="admin-button-left">
						<Button 
							onClick={() => this.toggleUploadImageDialog()}
							color="primary"
						>
							ADD NEW IMAGE
						</Button>
					</div>
					<div className="admin-button-right">
						< SaveCancel 
							edited={this.props.edited}
							save={this.props.save}
							cancelSave={this.props.cancelSave}
						/>
					</div>
				</div>

				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>Thumbnail</TableCell>
								<TableCell>id</TableCell>
								<TableCell>Delete</TableCell>
								{/* <TableCell>Edit</TableCell> */}
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.images.map((image, index) => {
								if (image.name.toUpperCase()
									.includes(this.state.searchValue.toUpperCase()
									)) {
									return <ImageListComponent 
										toggleDialog={this.toggleUploadImageDialog.bind(this)}
										toggleDeleteDialog={this.toggleDeleteDialog.bind(this)}
										image={image} 
										key={index}                        
										edit={this.editimage.bind(this)}
									/>;

								}
							})}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}