import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WeatherForecasts';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './FetchData.css';

const MyButton = styled(Button)({
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

class FetchData extends Component {
  componentDidMount() {
    // This method runs when the component is first added to the page
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    //this.props.requestWeatherForecasts(startDateIndex);
  }

    render() {
        console.log("this.props",this.props)
    return (
      <div>
        <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            <ForecastsTable forecasts={this.props.forecasts} />
            {renderPagination(this.props)}
            {renderAddButton(this.props)}
            {renderTables(this.props)}
      </div>
    );
  }
}


class ForecastsTable extends PureComponent {
    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.forecasts.map(forecast =>
                        <tr key={forecast.dateFormatted}>
                            <td>{forecast.dateFormatted}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
 
}

function renderPagination(props) {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return <div class="flex-container">
        <Button variant="outlined" color="primary" size="large" onClick={() => props.requestWeatherForecasts({ prevStartDateIndex })}>
                    Previous
            </Button>
            {props.isLoading ? <span>Loading...</span> : []}
        <Button variant="outlined" color="primary" size="large" onClick={() => props.requestWeatherForecasts({ nextStartDateIndex })}>
                    Next
             </Button>
        </div>;
}

function renderTables(props) {
    return (
        <div class="flex-container button-list" >
            {props.tables.map(table => 
                <Button variant="contained" color="primary" size="large" >
                    Table {table.tableNo}
                </Button>
            )}
        </div >
    );
}

function renderAddButton(props) {
    return (
        <Fab size="small" color="secondary" aria-label="Add" onClick={props.requestTables}>
            <AddIcon />
        </Fab>
    );
}

export default connect(
  state => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
