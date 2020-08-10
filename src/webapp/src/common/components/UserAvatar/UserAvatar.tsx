import React, {Fragment, useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const UserAvatar = ({user, logout}: UserAvatarPropType) => {
  const dropdownTitle = user.username;

  return (
    <Fragment>
      <DropdownButton title={dropdownTitle} id="userAvatarDropdown" size="sm">
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </DropdownButton>
    </Fragment>
  );
};

export {UserAvatar};
