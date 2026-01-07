"use client"

import { Progress } from "@/components/ui/progress"

export function ProgressBar({percentag}: {percentag: number}) {


  return <Progress value={percentag}  className="" />
}


