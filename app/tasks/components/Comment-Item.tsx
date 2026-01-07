import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Comment } from "@/lib/types"

interface ChildProps {
    getComments: Comment;
}
function getRelativeTime(isoString: string): string {
    const now = new Date();
    const past = new Date(isoString);

    // If future date
    if (past > now) {
        return 'in the future';
    }

    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffYear > 0) return rtf.format(-diffYear, 'year');
    if (diffMonth > 0) return rtf.format(-diffMonth, 'month');
    if (diffWeek > 0) return rtf.format(-diffWeek, 'week');
    if (diffDay > 0) return rtf.format(-diffDay, 'day');
    if (diffHour > 0) return rtf.format(-diffHour, 'hour');
    if (diffMin > 0) return rtf.format(-diffMin, 'minute');
    return rtf.format(-diffSec, 'second');
}


export default function CommentItems({ getComments }: ChildProps) {
    // time formate
    const date = new Date(getComments.createdAt);
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return (
        <Card className="w-full relative bg-transparent  gap-0 shadow-none border-0 border-b border-dashed rounded-none">
            <CardHeader>
                <Item>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <ItemContent>
                        <ItemTitle>
                            {getComments.author}
                            <span className="text-xs text-gray-400">
                                - {time}
                            </span>
                        </ItemTitle>
                        <ItemDescription className="text-xs">
                            ({getRelativeTime(getComments.createdAt)})
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </CardHeader>
            <CardContent className="pb-5">
                <pre>
                    {
                        getComments.content
                    }
                </pre>

            </CardContent>
            <span className="absolute text-xs text-gray-500 font-bold -bottom-2.75 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full   border border-dashed bg-white">
                {getRelativeTime(getComments.createdAt)}
            </span>
        </Card>
    )
}
