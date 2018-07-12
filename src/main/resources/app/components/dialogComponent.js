import React from 'react';

import CreateCategoryComponent from './createCategoryComponent';
import CreateItemComponent from './createItemComponent';
import UserItemViewComponent from './userItemViewComponent';
import CheckoutComponent from './checkoutComponent';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});


export default class DialogComponent extends React.PureComponent { 
  
  constructor(props){
		super(props)
		this.state = {
			open: this.props.open
		};
	}

	componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open) {
        this.setState({open:nextProps.open});
    }
  }

	handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  renderDialog(){
    switch (this.props.type) {
      case "ITEM" || "CATEGORY":
        return <Dialog disableBackdropClick open={this.state.open} onClose={this.props.onClose}>
            <DialogContent>{this.getFormType()}</DialogContent>
          </Dialog>;
      case "ITEM_VIEW":
        return (
          <Dialog
            open={this.state.open}
            onClose={this.props.onClose}
          >
            <DialogContent>
              <UserItemViewComponent item={this.props.item}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() =>this.props.addToCart(this.props.item)} 
                color="primary">
                Add to cart +
              </Button>
            </DialogActions>
          </Dialog>
        )

      case "CHECKOUT":
        return (
          <Dialog
            open={this.state.open}
            onClose={this.props.onClose}
          >
          <DialogTitle>Choose your payment method</DialogTitle>
            <DialogContent>
              <CheckoutComponent onItemsBought={this.props.onItemsBought}/>
            </DialogContent>
          </Dialog>
        )


      default:
        return null;
    }
  }

	getFormType(){
		switch (this.props.type) {
			case "ITEM":
				return <CreateItemComponent submit={this.props.itemSubmit} categories={this.props.categories} onClose={this.props.onClose}/>
			case "CATEGORY":
				return <CreateCategoryComponent submit={this.props.categorySubmit}/>
			default:
				return null;
		}
	}


  render() {
		return(
			<div>
        {this.renderDialog()}
      </div>
		)
	}
}
