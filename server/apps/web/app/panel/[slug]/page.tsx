export default function Page({ params }: { params: { slug: string } }): JSX.Element {
    return <div>My PDU: {params.slug}</div>
}