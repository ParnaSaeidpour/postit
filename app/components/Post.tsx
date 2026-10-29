'use client'

import Image from "next/image"

type PostProps = {
    avatar: string | null
    name: string | null
    postTitle: string
}

export default function Post({ avatar, name, postTitle }: PostProps) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                {avatar && (
                    <Image
                        className="rounded-full"
                        width={32}
                        height={32}
                        src={avatar}
                        alt="avatar"
                    />
                )}
                <h3 className="font-bold text-gray-700">{name || "Anonymous"}</h3>
            </div>
            <div className="my-8">
                <p className="break-words">{postTitle}</p>
            </div>
        </div>
    )
}
