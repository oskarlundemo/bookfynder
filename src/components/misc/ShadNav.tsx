import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {NavMenu} from "@/components/misc/NavMenu";
import {UserAvatar} from "@/components/misc/UserAvatar";


export const ShadNav = () => {

    return (
        <Sheet>
            <SheetTrigger>
                <div className={'flex flex-row items-center gap-2'}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>

                    <NavMenu/>

                </SheetHeader>

                <SheetFooter>
                    <div className="flex m-5 self-end">
                        <UserAvatar/>
                    </div>
                </SheetFooter>

            </SheetContent>

        </Sheet>
    )
}