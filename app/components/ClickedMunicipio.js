import React from 'react';
import { Label, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line, Margin } from 'recharts';
import css from '../styles.css';
import { Tab } from 'material-ui';



export default class ClickedMunicipio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let values = [];
        let year = ''
        if (this.props.payload != null && this.props.payload.length > 0) {
            values = this.props.payload
                .sort((a,b)=> (a.name.localeCompare(b.name)))
                .map( (val, index) => {
                    let number = val.value != null ? val.value.toLocaleString() : ''
                    return  (<div key={index} className={'country-wrapper'}>
                                <span className={'municipio-name'} style={{color: val.stroke}}>{val.name + ''}</span>
                                <span className={'number-value'} style={{color: val.stroke}}>{number}</span>
                            </div>)
                })
            console.log(this.props.payload[0])
            year = this.props.payload[0].payload['Año']
        }
        return (
            <div style={this.props.wrapperStyle}>
                <div ><h4 className={"year"}>Año: {year}</h4></div>
                <hr />
                <div className={"value"}>{values}</div>
            </div>
        )
    }
}