import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const MultipleSelect: React.FC = () => (
  <Select
    mode="tags"
    
    style={{ width: '100%', height:'40px'}}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={options}
  />
);

export default MultipleSelect;
