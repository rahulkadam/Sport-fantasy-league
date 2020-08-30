import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faEdit,
  faEye,
  faMinusSquare,
  faPlusSquare,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const Icon = ({name, iconType, ...rest}: {[key: string]: any}) => {
  function getIconItem(value: string) {
    switch (value) {
      case 'view':
        return faEye;
      case 'edit':
        return faEdit;
      case 'delete':
        return faTrashAlt;
      case 'minus':
        return faMinusSquare;
      case 'add':
        return faPlusSquare;
      case 'lock':
        return faBookmark;
      default:
        return faEye;
    }
  }

  function renderIconType() {
    switch (iconType) {
      case 'fontawesome':
        return <FontAwesomeIcon icon={getIconItem(name)} size="sm" {...rest} />;
      case 'other':
        return <div>Other type</div>;
      default:
        return <FontAwesomeIcon icon={getIconItem(name)} {...rest} />;
    }
  }

  return <div>{renderIconType()}</div>;
};

Icon.propTypes = {
  name: PropTypes.string,
  iconType: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
  iconType: 'fontawesome',
};

export {Icon};
