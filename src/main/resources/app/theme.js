/** 
 * This file describes the Material theme used by this app 
 */

// Material UI 
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


export default createMuiTheme({
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: "#90A4AE", //red[500]
		}
	}
}); 