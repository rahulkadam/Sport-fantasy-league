import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {fireEvent} from '@testing-library/dom';

import {FantasyButton} from './FantasyButton';

describe('Button Test', () => {
  const onClick = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('User must be able to click button when it is enabled', () => {
    const {getByText} = render(
      <FantasyButton title="Button" isDisabled={false} onClick={onClick} />
    );
    const fantasyButton = getByText('Button');
    fireEvent.click(fantasyButton);
    expect(onClick).toHaveBeenCalled();
  });

  test('User must not be able to click button when it is disabled', () => {
    const {getByText} = render(
      <FantasyButton title="Button" isDisabled={true} onClick={onClick} />
    );
    const fantasyButton = getByText('Button');
    fireEvent.click(fantasyButton);
    expect(fantasyButton.closest('button')).toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
