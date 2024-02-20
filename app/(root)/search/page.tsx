import React from "react";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

const Page = async () => {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect("/onboarding");

	//fetch users
	const result = await fetchUsers({
		userId: user.id,
		pageNumber: 1,
		pageSize: 25,
		searchString: "",
		sortBy: "desc",
	});

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>

			<div className="mt-14 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p className="no-result">No Results</p>
				) : (
					<>
						{result.users.map((user) => (
							<UserCard
								key={user.id}
								id={user.id}
								username={user.username}
								bio={user.bio}
								name={user.name}
								imgUrl={user.image}
								personType="User"
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Page;
