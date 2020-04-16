import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, Icon } from "semantic-ui-react";
import { FIELD_TEXT } from "../constants/rfqConstants";
import { setCreateRFQFieldValue, resetCreateRFQFieldValue } from "../actions/index";

const CreateRFQModalContainer = (props) => {
  const { createRFQField, setCreateRFQFieldValue, resetCreateRFQFieldValue } = props;
  const [ openModal, setOpenModal ] = useState(false);
  const [ openFollowUpModal, setOpenFollowUpModal ] = useState(false);

  const generateInputFieldProps = (field) => {
    return {
      value: createRFQField[field],
      onChange: (ev, data) => {
        setCreateRFQFieldValue(field, data.value);
      }
    }
  };

  const handleSubmit = () => {
    setOpenFollowUpModal(true);
  };

  const isFormValid = () => {
    for(const key in createRFQField){
      if(!createRFQField[key]){
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <Modal 
        size="tiny"
        open={openModal} 
        trigger={<div onClick={() => setOpenModal(true)}><Icon name="plus" /> Create RFQ</div>}
        onOpen={() => setOpenModal(true)}
        onClose={() => {
          resetCreateRFQFieldValue();
          setOpenModal(false);
        }}
        closeIcon
        >
        <Modal.Header>Create RFQ</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              {Object.keys(FIELD_TEXT).map(field => {
                return (
                  <Form.Field key={field}>
                    <label>{FIELD_TEXT[field]}</label>
                    <Input {...generateInputFieldProps(field)}/>
                  </Form.Field>
                );
              })}
              <Button onClick={handleSubmit} disabled={isFormValid()}>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>

      <Modal size="tiny" open={openFollowUpModal}>
        <Modal.Header>Create RFQ</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Successfully created RFQ!</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Ok' onClick={() => {
            setOpenFollowUpModal(false);
            setOpenModal(false);
            resetCreateRFQFieldValue();
            }} />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  createRFQField: state.createRFQField
});

const mapDispatchToProps = dispatch => ({
  setCreateRFQFieldValue: (field, value) => dispatch(setCreateRFQFieldValue(field, value)),
  resetCreateRFQFieldValue: () => dispatch(resetCreateRFQFieldValue())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRFQModalContainer);