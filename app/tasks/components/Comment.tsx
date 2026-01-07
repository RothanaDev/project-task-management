import { Comment as CommentType } from '@/lib/types'
import React from 'react'
import CommentItems from './Comment-Item'
import { EmptyTable } from './Empty-Table';
import { MessageSquareX } from 'lucide-react';

interface CommentProps {
  comments: CommentType[] | undefined;
}

export default function Comment({ comments }: CommentProps) {

  return (
    <div className='flex flex-col gap-3'>
      {
        comments && comments?.length > 0 ?
          comments?.map((cmt) => (
            <CommentItems getComments={cmt} key={cmt.id} />
          ))
          :
          <EmptyTable  icon={MessageSquareX} title='No comments' description="When they comment on you post, you'll to see them here."/>
      }
    </div>
  )
}
