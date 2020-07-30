import React, {Fragment, useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const UserAvatar = ({user, logout}: UserAvatarPropType) => {
  const dropdownTitle =
    user.firstname?.substr(0, 1) + ' ' + user.lastname?.substr(0, 1);

  return (
    <Fragment>
      <DropdownButton title={dropdownTitle} id="userAvatarDropdown" size="sm">
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};

export {UserAvatar};
