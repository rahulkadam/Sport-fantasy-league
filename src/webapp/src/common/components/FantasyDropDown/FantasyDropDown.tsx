import React, {Fragment} from 'react';

const FantasyDropDown = ({onSelect, list}: FantasyDropDown) => {
  function renderList() {
    const optionList: any = [];
    list &&
      list.forEach((dropDownItem: any) => {
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
        <select
          className="form-control"
          onChange={event => onSelect(event.target.value)}>
          {renderList()}
        </select>
      </Fragment>
    );
  }

  return <Fragment>{renderDropDown()}</Fragment>;
};

export {FantasyDropDown};
