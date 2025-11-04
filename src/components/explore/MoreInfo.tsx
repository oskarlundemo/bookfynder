"use client"

import { Info } from 'lucide-react';
import * as React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {
    aboutAuthor: string;
    whyRead: string;
    whyRecommended: string;
}

export default function MoreInfo ({aboutAuthor, whyRead, whyRecommended}: Props) {
    return (
            <Dialog>
                <DialogTrigger>
                    <Info
                        height={15}
                        width={15}
                        className="
                         cursor-pointer
                         transform
                         hover:scale-110
                         transition
                         duration-200
                        "
                        stroke="gray"
                    />
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>More information</DialogTitle>
                  </DialogHeader>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What makes the book worth reading?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    {whyRead}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Who is the author, and what are they known for?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    {aboutAuthor}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Why was this book recommended to me?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    {whyRecommended}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


            </DialogContent>
            </Dialog>
    )
}