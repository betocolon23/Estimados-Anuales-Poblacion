import React from 'react';
import { Label, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line, Margin } from 'recharts';
import css from '../styles.css';

export default class CustomTooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let values = [];
        console.log(this.props.payload)

        if (this.props.payload != null && this.props.payload.length > 0) {
            values = this.props.payload
                .sort((a,b)=> (a.name.localeCompare(b.name) ) )
                .map( (val, index) => { 
                    return  (<span key={index}>{val.name + ' ' + val.value.toLocaleString() }<br/></span>)
                })
        }
        return (
            <div style={this.props.wrapperStyle}
            className={'tooltip'}>
                {values}
            </div>
        )
    }
}