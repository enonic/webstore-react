    import React from 'react';

    // Material UI 
    import Dialog from '@material-ui/core/Dialog';
    import DialogTitle from '@material-ui/core/DialogTitle';
    import DialogContent from '@material-ui/core/DialogContent';
    import DialogActions from '@material-ui/core/DialogActions';
    import Button from '@material-ui/core/Button';
    import Typography from '@material-ui/core/Typography'; 
    import Card from '@material-ui/core/Card'; 
    import CardMedia from '@material-ui/core/CardMedia'; 
    import CardHeader from '@material-ui/core/CardHeader';    
    import CardContent from '@material-ui/core/CardContent'; 
    
    // Components 
    import CheckoutComponent from './checkoutComponent';
    import CreateItemComponent from './admin/createItemComponent';
    import CreateCategoryComponent from './admin/createCategoryComponent';

    // Styles 
    import '../styles/storefront/dialogComponent.less'; 

    

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
        case "ITEM": 
        case "CATEGORY":
            return <Dialog 
                disableBackdropClick 
                open={this.state.open} 
                onClose={this.props.onClose}
            >
                <DialogContent>{this.getFormType()}</DialogContent>
            </Dialog>;
        case "ITEM_VIEW":
            return (
            <Dialog
                open={this.state.open}
                onClose={this.props.onClose}
            >
                <DialogContent 
                        className="DialogContent"
                >
                    <Card> 
                            <CardHeader title={this.props.item.name}/> 
                            <CardMedia
                                image={this.props.item.image.source}
                                className="DialogContent-Image"
                            />
                            <CardContent>
                                <Typography paragraph variant="body1">
                                    {this.props.item.info}
                                </Typography>
                            </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={this.props.onClose} 
                        className="Greyed-Button"
                    >
                        Close
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
                <DialogContent
                    className="DialogContent"
                >
                <CheckoutComponent onItemsBought={this.props.onItemsBought}/>
                </DialogContent>
            </Dialog>
            )
        case "DELETE":
            return (
            <Dialog
                open={this.state.open}
                onClose={this.props.onClose}
                disableRestoreFocus={true}
            >
            <DialogTitle>Do you want to delete this item?</DialogTitle>
                <DialogContent>
                <Typography>{this.props.message}</Typography>
                <Button 
                    onClick={this.props.onClose} 
                    className="Greyed-Button"
                >
                    Cancel
                </Button>
                <Button onClick={() => {
                    this.props.remove(this.props.toBeRemoved)
                    this.props.onClose()
                    }} 
                    color="primary"
                >
                    Delete
                </Button>
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
            return <CreateItemComponent 
                submit={this.props.submit} 
                onClose={this.props.onClose} 
                categories={this.props.categories}
                addImage={this.props.addImage} 
                images={this.props.images}
                itemToBeEdited={this.props.toBeEdited}
            />
        case "CATEGORY":
            return <CreateCategoryComponent 
                submit={this.props.submit} 
                onClose={this.props.onClose}
                categoryToBeEdited={this.props.toBeEdited}
            />
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
