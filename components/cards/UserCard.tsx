"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
	id: string;
	username: string;
	name: string;
	imgUrl: string;
	personType: string;
	bio: string
}

const UserCard = ({ id, username, name, imgUrl, bio, personType }: Props) => {
	const router = useRouter();

	return (
		<article className="user-card p-4 rounded-2xl active:scale-[.99] hover:bg-[#121010] cursor-pointer transition-all duration-300 select-none" onClick={()=>{router.push(`/profile/${id}`)}}>
			<div className="user-card_avatar">
				<Image
					src={imgUrl}
					alt="logo"
					width={36}
					height={36}
					className="rounded-full"
				/>
				<div className="flex-1 text-ellipsis flex flex-col">
					<h4 className="text-base-semibold text-light-1">{name} <span className="text-gray-1 select-text cursor-text pl-1">@{username}</span></h4>
					<p className="text-small-medium text-gray-1 text-ellipsis w-[200px] whitespace-nowrap overflow-hidden">{bio}</p>
				</div>
			</div>
		</article>
	);
};

export default UserCard;
