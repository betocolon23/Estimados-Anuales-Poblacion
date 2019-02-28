import React from 'react';
import CustomTooltip from './CustomToolTip';
import ClickedMunicipio from './ClickedMunicipio';
import { Label, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line, Margin } from 'recharts';
import css from '../styles.css';



export default class Grafica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: []
        }
        this.municipioLine = this.municipioLine.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    municipioLine() {
        console.log(this.props.selected)
        return this.props.selected.map((item, index) =>
            (<Line key={index} dataKey={item} stroke={this.props.fields
                .find(field => field.id == item).color} type={'linear'} />)
        );
    }

    handleClick(data, index) {
        console.log(data)
        this.setState({
            payload: data.activePayload
        });
    }

    render() {
        console.log(this.props.data);
        return (

            <div className={'low-container'}>
                <div className={'graph-wrapper'}>
                    <ResponsiveContainer height={'100%'} >
                        <LineChart height={70} data={this.props.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 35 }}
                            onClick={this.handleClick}
                            cursor="pointer"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type='number'
                                domain={['dataMin', 'dataMax']} interval={'preserveStartEnd'}
                                tickCount={20}
                                dataKey={'Año'}
                                margin={{ bottom: 50 }}
                                style={{ marginBottom: '50px' }}
                                height={60}>
                                <Label dy={5} dx={0} value={this.props.xAxis} position={'center'} />
                            </XAxis>
                            <YAxis
                                domain={[0, 'auto']}
                                orientation={'right'}
                                tickFormatter={(value) => value.toLocaleString()}>
                                <Label dx={-60} value={'(personas)'} position={'insideTopRight'} />
                            </YAxis>
                            {this.municipioLine()}
                                
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={'clicked-container'}>
                    <div>
                        <h4 className={'seleccion'}>Selección</h4>
                    </div>
                    <div className={'data-table'}>
                        <ClickedMunicipio
                            payload={this.state.payload}
                        />
                    </div>
                </div>
            </div>
        )
    }
}