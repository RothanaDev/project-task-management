'use client'

import React from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import { Controller, Control } from 'react-hook-form'
import { TaskFormValues } from '@/lib/validators/task'
import { TaskUpdateFormValues } from '@/lib/validators/taskUpdateSchema'

interface AntdCreatableTagSelectProps {
  control: Control<TaskUpdateFormValues>
  placeholder?: string
  initialOptions?: { value: string; label: string }[] // optional: pre-populated options
}

export function AntdMultiSelect({
  control,
  placeholder = "Type to create or select tags...",
  initialOptions = [],
}: AntdCreatableTagSelectProps) {
  // Combine initial options + any dynamically created ones will be handled by antd
  const allOptions = React.useMemo<SelectProps['options']>(
    () => [
      ...initialOptions,
      // antd will automatically add new tags when user types
    ],
    [initialOptions]
  )

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field: { onChange, value = [] } }) => (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={allOptions}
          tokenSeparators={[',', ' ']}
          allowClear
          showSearch
          maxTagCount="responsive"
        />
      )}
    />
  )
}
