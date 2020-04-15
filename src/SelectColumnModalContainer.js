import React from 'react';
import { connect } from 'react-redux'; 
import { Modal, Icon, Checkbox, Button } from 'semantic-ui-react';

import { FILTER_FIELD } from './constants/rfqConstants';
import { setShowColumn } from './actions/index';

const SelectColumnModalContainer = (props) => {
  const { showColumn, setShowColumn } = props;

  const handleCheckboxChange = (field) => (ev, data) => {
    setShowColumn(field, data.checked);
  };

  return (
    <Modal trigger={<Button><Icon name='columns'/> Columns</Button>} closeIcon>
    <Modal.Header>Select which column(s) to display</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        {Object.keys(FILTER_FIELD).map(key => {
          return (
            <div>
              <Checkbox key={key} label={FILTER_FIELD[key]} 
                checked={showColumn[FILTER_FIELD[key]]} onChange={handleCheckboxChange(FILTER_FIELD[key])}/>
            </div>
          );
        })}
      </Modal.Description>
    </Modal.Content>
  </Modal>
  );
};

const mapStateToProps = state => ({
  showColumn: state.showColumn
});

const mapDispatchToProps = dispatch => ({
  setShowColumn: (field, value) => dispatch(setShowColumn(field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectColumnModalContainer);