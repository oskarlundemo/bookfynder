"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

type Props = {
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DeleteBookDialog({ handleDelete }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="
          flex-grow
          rounded-md
          flex
          justify-center
          items-center
          bg-gradient-to-r from-red-500 to-red-600
          text-white
          font-medium
          cursor-pointer
          shadow-sm
          transition-all
          hover:from-red-600 hover:to-red-700
          hover:shadow-md
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-400
          focus-visible:ring-offset-2
        "
            >
                Delete Book
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your book
                        and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
