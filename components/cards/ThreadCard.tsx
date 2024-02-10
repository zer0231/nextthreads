import Image from "next/image";
import Link from "next/link";

interface Props {
    username: string | null | undefined,
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string, author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string
    } | null;
    createdAt: string; comments: {
        author: {
            image: string;
        }
    }[];
    isComment?: boolean;
}

const ThreadCard = ({
    username, id, currentUserId, parentId, content, author, community, createdAt, comments
}: Props) => {
    return (<article className="flex w-full flex-col rounded-x1 bg-dark-2 p-7">
        <div className="flex item-start justify-between">
            <div className="flex w-full lfex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${author.name}`} className="relative h-11 w-11" >
                        <Image
                            src={author.image}
                            alt="profile image"
                            fill
                            className="cursor-pointer rounded-full"
                        />
                    </Link>
                    <div className="thread-card_bar" />

                </div>

                <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-fit" >
                        <h4 className="cursor-pointer text-base-semibold text-light-1">
                            {username}
                        </h4>
                    </Link>
                </div>

            </div>
        </div>
        <h3 className="text-small-regular text-light-2">
            {/* {author.name ?? currentUserId} */}
        </h3>
        <h2 className="text-small-regular text-light-2">

            {content}
        </h2>
    </article>)
}

export default ThreadCard;