"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
	personType: string;
	bio: string
}

function UserCard({ id, name, username, imgUrl, personType, bio }: Props) {
	const router = useRouter();

	const isCommunity = personType === "Community";

	return (
		<article className='user-card p-4 rounded-xl active:scale-[.99] hover:bg-[#121010] cursor-pointer transition-all duration-300 select-none' onClick={() => {
			if (isCommunity) {
				router.push(`/communities/${id}`);
			} else {
				router.push(`/profile/${id}`);
			}
		}} >
			<div className='user-card_avatar'>
				<div className='relative h-12 w-12'>
					<Image
						src={imgUrl}
						alt='user_logo'
						fill
						className='rounded-full object-cover'
					/>
				</div>

				<div className='flex-1 flex flex-col text-ellipsis'>
					<div className="flex">
						<h4 className='text-base-semibold text-light-1'>{name}</h4>
						<p className='text-small-medium text-gray-1 pl-2 cursor-text select-text'>@{username}</p>
					</div>
					<p className="text-small-medium text-gray-1 text-ellipsis w-[200px] whitespace-nowrap overflow-hidden">{bio}</p>
				</div>
			</div>
		</article>
	);
}

export default UserCard;