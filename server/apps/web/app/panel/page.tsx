import React from 'react'
import { Accordion, AccordionCollapse, AccordionHeader, AccordionItem } from 'react-bootstrap'

interface PropsDevices {

    id: string,
    title: string,
    href: string,

}
export default function Page(): JSX.Element {
    const devices: PropsDevices[] = [
        {
            id: "1",
            title: "PDU1",
            href: "/panel/PDU1",
        },
        {
            id: "2",
            title: "PDU2",
            href: "/panel/PDU2",
        },
        {
            id: "3",
            title: "PDU3",
            href: "/panel/PDU3",
        },
    ]
    return (
        <Accordion alwaysOpen style={{ padding: "2px" }}>
            {devices.map(x => {
                return (
                    <AccordionItem eventKey={x.id} key={x.id}>
                        <AccordionHeader >{x.title}</AccordionHeader>
                        <AccordionCollapse eventKey={x.id}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </AccordionCollapse>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}