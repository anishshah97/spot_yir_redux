import React, { Component } from 'react'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { storeSortSelection, storeSortDirection } from "../actions/DataFormat"



const sorters = ["added_at", "danceability", "energy", "acousticness", "liveness", "valence", "tempo", "duration_ms"]

export class PlaylistSorter extends Component {
    handleSortChange(event){
        this.props.storeSortSelection(event.target.value)
    }

    handleDirChange(event){
        this.props.storeSortDirection(event.target.value)
    }

    render() {
        var sort_sel = this.props.Data.sort_selection
        var sort_dir = this.props.Data.sort_direction
        return (
            <div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sort Options</FormLabel>
                                <RadioGroup
                                    value={sort_sel}
                                    onChange={this.handleSortChange.bind(this)}
                                    row
                                >
                                    {sorters.map(key => 
                                        <FormControlLabel value={key} control={<Radio />} label={key} />
                                    )}
                                </RadioGroup>
                        </FormControl>
                    </div>
                    
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Direction</FormLabel>
                                <RadioGroup
                                    value={sort_dir}
                                    onChange={this.handleDirChange.bind(this)}
                                    row
                                >
                                    <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                                    <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                                </RadioGroup>
                        </FormControl>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    storeSortSelection: (selection) => dispatch(storeSortSelection(selection)),
    storeSortDirection: (direction) => dispatch(storeSortDirection(direction))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistSorter);