import React from 'react';
import PropTypes from "prop-types";

// Material UI 
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'; 
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


// Stylesheets 
import '../styles/createItemComponent.less'
// Sample data 
import SampleData from '../sampleData.json'; 

export default class CreateItemComponent extends React.PureComponent {
    constructor(arg){
        super(arg)
        this.state = {
            name: "",
            info: "",
            image: "none",
            category: "none",
        };
    }
    
    getImageItems() {
        return this.props.images.map((image, index) =>
            <MenuItem key={index} value={image}>{image.name}</MenuItem>
        )
    }

    getCategoryItems() {
        return this.props.categories.map( (category, index) => 
            <MenuItem key={index} value={category}>{category.title}</MenuItem>
        )
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleImageChange = event => {
        this.setState({ image: event.target.value.source})
    }

    handleCategoryChange = event => {
        this.setState({category: event.target.value.title})
    }

    validateAndSubmit = () => {
        if (this.state.name !== "" && this.state.info !== "") {
            this.props.submit(this.state);
        }
    }

    render(){
        console.log(this.state); 
        return (
        <div className="CreateItemComponent">
            <form>
                
                {this.state.image != "none" ? 
                    <Card className="Item-Card">
                        <CardMedia
                            image={this.state.image}
                            className="Item-Card-Media"
                        /> 
                    </Card> : null}
                    

                <FormControl >

                    <TextField
                        label="Name"
                        id="name"
                        value={this.state.name}
                        margin="normal"
                        onChange={this.handleChange}
                        required
                        error={this.state.name === ""}
                    />

                    <TextField
                        label="Info"
                        id="info"
                        value={this.state.info}
                        margin="normal"
                        onChange={this.handleChange}
                        required
                        error={this.state.info === ""}
                    />
                
                    <FormControl>
                        {/*<InputLabel>Image</InputLabel>*/}
                        <InputLabel>{this.state.image}</InputLabel>
                        <Select
                            value={this.state.image}
                            name="image"
                            onChange={this.handleImageChange}
                            autoWidth>
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {this.getImageItems()}
                        </Select>
                    </FormControl>       
                    <FormControl>
                        {/*<InputLabel>Category</InputLabel>*/}
                        <InputLabel>{this.state.category}</InputLabel>
                        <Select
                            value={this.state.category}
                            name="category"
                            onChange={this.handleCategoryChange}
                            autoWidth>
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {this.getCategoryItems()}
                        </Select>
                    </FormControl>
                </FormControl>
                    
            </form>
            <DialogActions>
                
                <Button onClick={this.validateAndSubmit} color="primary">
                    Submit
                </Button>
                <Button onClick={this.props.onClose.bind(this)} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </div>
        )
    }
}

