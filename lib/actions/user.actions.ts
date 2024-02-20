"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import { Children } from "react";

interface Params {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
}

export async function updateUser({
	userId,
	bio,
	name,
	path,
	username,
	image,
}: Params): Promise<void> {
	try {
		connectToDB();

		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true }
		);

		if (path === "/profile/edit") {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
}

export async function fetchUser(userId: string) {
	try {
		connectToDB();
		return await User.findOne({ id: userId });
		// 	.populate({
		// 	path: "communities",
		// 	model: Communities,
		// });
	} catch (error: any) {
		throw new Error(`Failed to fetch User: ${error.message}`);
	}
}

export async function fetchUserPosts(userId: string) {
	try {
		connectToDB();

		// Find all the threads by the given userid
		const threads = await User.findOne({ id: userId }).populate({
			path: "threads",
			model: Thread,
			populate: {
				path: "children",
				model: Thread,
				populate: {
					path: "author",
					model: User,
					select: "name image id",
				},
			},
		});

		return threads;
	} catch (error: any) {
		throw new Error(`Error fetching the threadsL ${error.messagee}`);
	}
}

export async function fetchUsers({
	userId,
	pageNumber = 1,
	pageSize = 20,
	searchString = "",
	sortBy = "desc",
}: {
	userId: string;
	pageNumber?: number;
	pageSize?: number;
	searchString?: string;
	sortBy?: string;
}) {
	try {
		connectToDB();

		const skipAmount = (pageNumber - 1) * pageSize;
		const regex = new RegExp(searchString, "i");

		const query: FilterQuery<typeof User> = { id: { $ne: userId } };

		if (searchString.trim() !== "") {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}

		// Fix the type of sortOptions
		const sortOptions: { [key: string]: SortOrder | { $meta: any } } = {};
		sortOptions.createdAt =
			sortBy === "asc" ? 1 : sortBy === "desc" ? -1 : { $meta: "textScore" };

		const usersQuery = User.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize);

		const totalUsersCount = await User.countDocuments(query);

		const users = await usersQuery.exec();

		const isNext = totalUsersCount > skipAmount + users.length;

		return { users, isNext };
	} catch (error: any) {
		throw new Error(`Failed to fetch Users: ${error.message}`);
	}
}

export async function getActivity(userId: string) {
    try {
        connectToDB();

        const userThreads = await Thread.find({ author: userId });

        const childThreadsIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []); // Add an empty array as the initial value

        const replies = await Thread.find({
            _id: { $in: childThreadsIds },
            author: { $ne: userId }
        }).populate({
            path: "author",
            model: User,
            select: "name image _id"
        });
        return replies;
    } catch (error: any) {
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}