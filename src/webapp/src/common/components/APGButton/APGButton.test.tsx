import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {fireEvent} from '@testing-library/dom';

import {APGButton} from './APGButton';

describe('Astro Button Test', () => {
  const onClick = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('User must be able to click button when it is enabled', () => {
    const {getByText} = render(
      <APGButton title="Astro Button" isDisabled={false} onClick={onClick} />
    );
    const apgButton = getByText('Astro Button');
    fireEvent.click(apgButton);
    expect(onClick).toHaveBeenCalled();
  });

  test('User must not be able to click button when it is disabled', () => {
    const {getByText} = render(
      <APGButton title="Astro Button" isDisabled={true} onClick={onClick} />
    );
    const apgButton = getByText('Astro Button');
    fireEvent.click(apgButton);
    expect(apgButton.closest('button')).toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
