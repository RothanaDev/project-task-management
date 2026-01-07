import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectItems() {
  return (
    <Select >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select tags" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tags</SelectLabel>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="banana">Accessibility</SelectItem>
          <SelectItem value="documentation">Documentation</SelectItem>
          <SelectItem value="research">Research</SelectItem>
          <SelectItem value="ux">UX</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
