import React from 'react';
import {Cards, Chart, CountryPicker} from './components'; 
import styles from './App.module.css';
import {fetchData} from './api'; //calling that fn from index.js in api folder

class App extends React.Component{
    // console.log('asas');
    state = {
        data: {},
        country: '',
    }
    
    async componentDidMount(){
        const fetchedData = await fetchData();
        
        // console.log(data);
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        // console.log(fetchedData);
        // console.log(country);    
        this.setState({data: fetchedData, country: country}); //what if we write this.state() instead of this.setState
    }
    
    render(){
        const {data, country} = this.state;

        return(
            <div className={styles.container}>
                <Cards kunj={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;