import 'jest-dom/extend-expect';

import { describe, expect, test } from '@jest/globals';
import React from "react";
import { render, cleanup } from "@testing-library/react";
import ListDataItem from "../src/components/ListData/ListDataItem"
afterEach(cleanup);

describe('ListDataItem component', () => {
  it('renders the label, value, and icon', () => {
    const { getByText } = render(
      <ListDataItem
        label="Label"
        value="Value"
        icon={() => <span>Icon</span>}
      />
    );
    
    const labelElement = getByText('Label');
    expect(labelElement).toBeDefined();

    const valueElement = getByText('Value');
    expect(valueElement).toBeDefined();
    
    const iconElement = getByText('Icon');
    expect(iconElement).toBeDefined();
  });
});
