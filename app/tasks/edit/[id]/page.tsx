
import ContentRendering from "../../components/Content-Rendering";
import { EditTask } from "../../components/Edit-Task";



interface ChildrenProp {
    params: Promise<{ id: string }>
}




export default async function TaskDetailPage({ params }: ChildrenProp) {

    const { id } = await params;


    return (
        <div className="grid grid-cols-1 w-full">
            <EditTask  id={id}/>
        </div>

    )
}
