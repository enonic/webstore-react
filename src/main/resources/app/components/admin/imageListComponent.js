import React from 'react';

// Material UI 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar'; 

export default class ImageListComponent extends React.PureComponent {
	constructor(arg){
		super(arg);
        
	}
	remove() {
		this.props.remove(this.props.image);
	}
    
	toggleVisible(){
		this.props.toggleVisible(this.props.image);
	}

	render(){ 
		let styleClass = this.props.image.edited ? 'adminListComponent-edit' : 'adminListComponent';
		return <TableRow 
			className={styleClass} 
			onClick={() => this.props.edit(this.props.image)}
			style={{ cursor: 'pointer' }}
		>
			<TableCell component="th" scope="row">
				{this.props.image.name}
			</TableCell>
			
			<TableCell>
				<Avatar src={this.props.image.source}/>
			</TableCell>
			<TableCell>{this.props.image.id}</TableCell>

        
			<TableCell>
				<IconButton onClick={(event) => {
					event.stopPropagation(); 
					this.props.toggleDeleteDialog('DELETE', this.props.image); 
				}}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
			{/* <TableCell>
				<IconButton onClick={() => this.props.edit(this.props.image)}>
					<EditIcon />
				</IconButton>
			</TableCell> */}
		</TableRow>;
	}
}

