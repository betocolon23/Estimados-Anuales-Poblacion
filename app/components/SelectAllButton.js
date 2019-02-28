import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import css from '../styles.css';



export default class SelectAllButton extends React.Component {
    constructor(props) {
      super(props);
      this.selectAllFunction = this.selectAllFunction.bind(this);
    }

    selectAllFunction() {
        this.props.handleSelect()
    }

    render() {
        return (
            <div className={'select-button'}>
                <RaisedButton  onClick={this.selectAllFunction} className={'select-button'}/>
            </div>
        );
    }
}