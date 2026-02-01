import ContentRendering from "../components/Content-Rendering";
export const dynamic = "force-dynamic";



interface ChildrenProp {
    params: Promise<{ id: string }>
}




export default async function TaskDetailPage({ params }: ChildrenProp) {

    const { id } = await params;


    return (
        <div className="grid grid-cols-1 w-full">
            <ContentRendering id={id} />
        </div>

    )
}
