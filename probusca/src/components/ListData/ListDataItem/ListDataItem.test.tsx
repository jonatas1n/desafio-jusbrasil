import { describe, expect } from '@jest/globals';
import React from "react";
import { render } from "@testing-library/react";
import ListDataItem from ".";

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
