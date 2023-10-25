"use client"

import "../globals.css";
import { OffCanvas } from "ui-components";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Navbar, NavbarBrand, Row } from "react-bootstrap";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [show, setShow] = useState<boolean>(false);

    return (
        <html lang="en">
            <Head>
                <title>PDU</title>
            </Head>
            <body className={inter.className}>
                <Row>
                    <OffCanvas handleClose={() => { setShow(prev => !prev); }} show={show} title="sidebar">
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                        <p>dj</p>
                    </OffCanvas>
                    <Col>
                        <Navbar sticky="top">
                            <Container>
                                <Button onClick={() => { setShow(true); }} variant="outline-dark">
                                    ---
                                </Button>
                                <NavbarBrand href="#">Navbar</NavbarBrand>
                                <Breadcrumb>
                                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                                    <BreadcrumbItem href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                        Library
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>Data</BreadcrumbItem>
                                </Breadcrumb>
                            </Container>
                        </Navbar>
                        <div id="#children">
                            {children}
                        </div>
                    </Col>
                </Row>
            </body>
        </html>
    );
}
