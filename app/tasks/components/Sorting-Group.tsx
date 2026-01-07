"use client"
import {  SearchIcon } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import SortingComponent from "./Sorting";




interface SortingProps{
    name: string;
    url: string;
}

interface SetStatusProps{
    name: string;
    url: string;
}

interface ChildProps {
    status: {
        name: string,
        url: string
    };
    sorting: SortingProps[]
    setStatus: React.Dispatch<React.SetStateAction<SetStatusProps>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function SortingGroup({status, setStatus, sorting,setSearch}: ChildProps) {


    return (
        <div className="grid grid-cols-2 mb-6">

            {/* Sorting */}
            <SortingComponent setStatus={setStatus} status={status} sorting={sorting}/>

            {/* Searching */}
            <div className="w-full flex items-center justify-end">
                <InputGroup className="w-[50%] rounded focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0">
                    <InputGroupInput
                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        placeholder="Search title..."
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    )
}
