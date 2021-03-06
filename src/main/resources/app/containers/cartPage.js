import React from 'react';
import PropTypes from 'prop-types';

// Components
import CartItemComp from '../components/cartItemComponent';
import DialogComponent from '../components/dialogComponent';

// Material UI
import Paper from '@material-ui/core/Paper'; 
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Stylesheets
import '../styles/cartPage.less';

// Project URLS 
import URLS from '../urls'; 

import { connect } from 'react-redux';

// Redux Actions 
import * as mainActions from '../actions/mainActions'; 
import * as toasterActions from '../actions/toasterActions'; 

class CartPage extends React.PureComponent { 

	constructor(props) {
		super(props); 
		this.state = {}; 
	}

	componentDidMount() {
		this.state = {
			dialogOpen: false,
			displayedItem: null,
			dialogType: '',
		};
	}

	toggleCheckoutMode() {
		this.setState({ dialogType: 'CHECKOUT', dialogOpen: true});
	}

	onItemsBought() {
		this.props.checkout();
		this.toggleCheckoutMode();
		this.props.history.push(URLS.storefront);
		this.props.openToaster('Thank you for your purchase!'); 
	}

	renderItems() {
		if(this.props.items.size > 0) {
			return <div>
				{this.props.items.map((item, index) => {
					return <CartItemComp item={item} key={index} remove={this.props.deleteItem} />;
				})}

				<Button 
					onClick={this.toggleCheckoutMode.bind(this)} 
					fullWidth
					color="secondary">Checkout</Button>
			</div>;
      
		}

		return <Typography variant="caption" align="center" style={{padding: '50px'}}>Your cart is empty</Typography>;
	}

	onDialogClose() {
		this.setState({
			dialogType: '', 
			dialogOpen: false 
		});
	}

	render() {
		return (
			<div>
				<DialogComponent 
					type={this.state.dialogType} 
					onClose={this.onDialogClose.bind(this)}
					onItemsBought={this.onItemsBought.bind(this)}
					open = {this.state.dialogOpen}
					item = {this.state.displayedItem}
				/>
				<Paper className="CartPage">
					<Typography 
						variant="headline" 
						align="center" 
						className="CartPage-Headline">Items in cart
					</Typography>
          
					{this.renderItems()}
				</Paper>
			</div>
		);
	}
}


CartPage.propTypes = {
	items: PropTypes.object
};

CartPage.defaultProps = {
};


function mapStateToProps(state){
  
	return {
		items: state.get('app').get('cartItems')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		deleteItem : (arg) => {mainActions.removeItemFromCart(dispatch,arg);},
		checkout : () => {mainActions.checkout(dispatch);}, 
		openToaster: (message) => { toasterActions.showToaster(dispatch, message);}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
