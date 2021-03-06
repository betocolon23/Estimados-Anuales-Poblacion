import React from 'react';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
    this.menuItems = this.menuItems.bind(this);
  }

  menuItems(municipios) {
    return municipios.map((municipio, index) => (
      <MenuItem key={index} value={municipio.id} primaryText={municipio.id} />
    ));
  }


  render() {
    return (
      <div>
        <DropDownMenu style={{ width: '300px' }}
          autoWidth={false}
          onChange={this.props.onChange}
          value={this.props.selected}
          multiple={true}
        >
          {this.menuItems(this.props.fields)}
        </DropDownMenu>
      </div>
    );
  }
}

