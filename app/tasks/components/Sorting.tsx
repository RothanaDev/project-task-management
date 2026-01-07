import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import React from 'react'


interface SetStatusProps{
    name: string;
    url: string;
}
interface SortingProps {
    name: string;
    url: string;
}
interface ChildProps {
    status: {
        name: string,
        url: string
    };

    setStatus: React.Dispatch<React.SetStateAction<SetStatusProps>>;
    sorting: SortingProps[]
}

export default function SortingComponent({ sorting, setStatus,status }: ChildProps) {
    return (
        <ButtonGroup className="">
            {
                sorting.map((item, index) => (
                    <ButtonGroup key={index} className=''>
                        <Button className={`text-sm hover:bg-transparent text-gray-950 px-3 py-1 cursor-pointer bg-transparent rounded-none ${status.url == item.url ? 'border-b border-gray-950 ' : 'hover:text-gray-600'}`} onClick={() => setStatus(item)}>{item.name}</Button>
                    </ButtonGroup>
                ))
            }
        </ButtonGroup>
    )
}
