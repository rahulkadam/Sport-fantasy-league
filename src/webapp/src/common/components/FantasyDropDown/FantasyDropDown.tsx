import React, {Fragment} from 'react';
import {Form} from 'react-bootstrap';

const FantasyDropDown = ({onSelect, list}: FantasyDropDown) => {
  function renderList() {
    const optionList: any = [];
    list &&
      list.forEach((dropDownItem: any) => {
        dropDownItem &&
          optionList.push(
            <option key={dropDownItem.id} value={dropDownItem.id}>
              {dropDownItem.name || dropDownItem.description}
            </option>
          );
      });
    return optionList;
  }

  function renderDropDown() {
    return (
      <Fragment>
        <Form.Control
          size="sm"
          as="select"
          onChange={event => onSelect(event.target.value)}>
          {renderList()}
        </Form.Control>
      </Fragment>
    );
  }

  return <Fragment>{renderDropDown()}</Fragment>;
};

export {FantasyDropDown};
