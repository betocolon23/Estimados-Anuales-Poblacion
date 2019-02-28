import React from 'react';
import Paper from 'material-ui/Paper';
import Municipios from './municipios';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'material-ui/RaisedButton';
import Deselect from 'material-ui/RaisedButton';

//Components
import Grafica from './Grafica';
import DropDown from './DropDown';
import SelectAllButton from './SelectAllButton';

//CSS
import css from '../styles.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectAll: false,
            "data": {
                records: [],
                fields: []
            },
            "selected": [],
            "xAxis": "Año"
        }
        this.handleChangeMunicipio = this.handleChangeMunicipio.bind(this);
        this.handleSelectAllMunicipio = this.handleSelectAllMunicipio.bind(this);
        this.handleDeselectMunicipio = this.handleDeselectMunicipio.bind(this);
        this.generateRandomColor = this.generateRandomColor.bind(this);
    }

    componentDidMount() {
        fetch('https://indicadores.pr/api/action/datastore_search?resource_id=8a2b3a66-7248-4c21-9631-545df1ffc2d9&limit=1000')
            .then(result => {
                return result.json();
            }).then(data => {
                console.log(data)
                console.log([data.result.fields[data.result.fields.length - 1].id])
                data.result.fields.forEach((field) => {
                    field.color = this.generateRandomColor()
                });
                this.setState({ 
                    data: data.result,
                    selected: [data.result.fields.find( field => field.id == 'Puerto Rico' ).id] 
                })
            })
    }

    generateRandomColor() {
        var letters = '123456789ABCD';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 13)];
        }
        return color;
    }

    handleChangeMunicipio(event, index, value) {
        this.setState({ selected: value });
    }

    handleSelectAllMunicipio() {
        this.setState({
            selectAll: true,
            selected: this.state.data.fields.filter(field => !(field.id == "_id" || field.id == "Año")).map((field) => field.id).sort((a,b)=> (a.localeCompare(b) ) )
        });
    }

    handleDeselectMunicipio() {
        this.setState({
            selected: ['Puerto Rico']
        });
    }

    render() {
        const style = {
            margin: 12,
        };

        return (
            <Paper zDepth={0} style={{height:'100%'}}>
                <div className={"flex-container"}>
                    <div className={"drop-down"}>
                        <DropDown
                            className={"drop-down"}
                            onChange={this.handleChangeMunicipio}
                            selected={this.state.selected}
                            fields={this.state.data.fields.filter(field => !(field.id == "_id" || field.id == "Año")).sort((a,b)=> (a.id.localeCompare(b.id) ) )}
                        />
                    </div>
                    <div>
                        <Select onClick={this.handleSelectAllMunicipio} label="Select All" style={style} />
                    </div>
                    <div>
                        <Select onClick={this.handleDeselectMunicipio} label="Deselect All" style={style} />
                    </div>
                </div>

                <div className={"graph-container"}> 
                    <Grafica
                        selected={this.state.selected}
                        data={this.state.data.records}
                        fields={this.state.data.fields.sort((a, b) => (a.id > b.id))}
                        xAxis={this.state.xAxis} 
                    /> 
                </div>
            </Paper>
        )
    }
}