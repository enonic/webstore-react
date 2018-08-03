import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as mainActions from '../actions/mainActions'; 

// Components 
import StoreFrontItem from '../components/storefront/storefrontItemComponent'; 

// Material UI 
import Grid from '@material-ui/core/Grid'; 

// Stylesheets
import '../styles/headless.less';

// Interfaces 
import Item from '../interfaces/item';
import Image from '../interfaces/image';

// Project URLS 
import URLS from '../urls';

class HeadlessPage extends React.PureComponent { 
	constructor(props) {
		super(props); 
    this.state = {
      items : []
    }
	}

	componentDidMount() {
    this.props.history.push(URLS.headless);
    this.getItems()
    .then(result => {
      this.setState({
        items : this.state.items.concat(result.data.guillotine.query)
      }); 
    })
    .catch(e => console.error("Headless site is not configured correctly", e)) 
	}


  getItems() {
    return new Promise((resolve, reject) => {

      // Definig query for enonic/lib-graphql
      const query = `{
        guillotine {
          query(contentTypes:"com.enonic.app.webstore.react:product") {
              displayName
              ... on com_enonic_app_webstore_react_Product {
                data {
                  description
                  photos {
                    ... on media_Image {
                      imageUrl(scale:"block(400,400)",type:absolute)
                    }
                  }
                }
              }
          }
        }
      }`;

      // variables : path to the content
      const variables = {
        'path': '/Webstore-content/headless'
      };

      // fetching with body as {query, variables}
      fetch(
        'http://localhost:8080/portal/master/headless/_/service/com.enonic.app.webstore.react/graphql',
        {
          method: 'POST',
          body: JSON.stringify({
            query: query,
            variables: variables
          }),
          credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  renderItems() {
    return this.state.items.map((item, index) => {
      let source; 
      if(item.data.photos[0] !== undefined) {
        source = item.data.photos[0].imageUrl; 
      } 

      return <Grid 
        key={index} 
        item 
        xs={12} 
        lg={4} 
        xl={3}
        >
        <StoreFrontItem 
          item={new Item({
            name : item.displayName, 
            info : item.data.description, 
            image: new Image({source : source})
          })}
          add={(item) => {this.props.addItemToCart(item)}}
          onClick={(item) => {console.log("an item was clicked", item)}}
          /> 
      </Grid>  
    }); 
  }


	render() {
    return <Grid 
      container
      item
      spacing={24}
      alignContent="center" 
      className="Headless"> 
      {this.renderItems()}
    </Grid>
	}
}

HeadlessPage.propTypes = {
	items: PropTypes.object,
};

HeadlessPage.defaultProps = {
};


function mapStateToProps(state){
	return {
   
	};
}

function mapDispatchToProps(dispatch) {
	return {
    addItemToCart: (arg) => { mainActions.addItemToCart(dispatch, arg) },
    searchCategory: (arg) => { mainActions.searchCategory(dispatch, arg) }
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(HeadlessPage);
