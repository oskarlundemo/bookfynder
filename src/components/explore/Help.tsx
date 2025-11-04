"use client"

import { CircleQuestionMark } from 'lucide-react';
import * as React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Help() {
    return (
        <div className={'absolute top-5 right-5'}>
            <Dialog>
                <DialogTrigger>
                    <CircleQuestionMark
                        className="
                         cursor-pointer
                         transform
                         hover:scale-110
                         transition
                         duration-200
                        "
                        stroke="gray"
                    />
                </DialogTrigger>                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Instructions</DialogTitle>
                        <DialogDescription className={'flex flex-col gap-2'}>

                            <span>
                              <strong>Swipe right</strong> to save a book to your <strong>Queued</strong> list — these are the ones you’d like to read later. You can find
                                them under the tab "Queue" <a className={'font-bold text-indigo-400 '} href="/books">here</a>.
                            </span>

                            <span>
                              <strong>Swipe left</strong> to skip a book and move on to the next one.
                            </span>

                            <span>
                            When you’ve gone through all the cards, you can <strong>fetch 10 new books</strong> and keep exploring.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}