type Props = {
    icon: any
}

export const OauthOption = ({icon}:Props) => {

    return (
        <div className="flex items-center rounded-2xl p-4 bg-gray-100 justify-center w-full">
            {icon}
        </div>
    )
}