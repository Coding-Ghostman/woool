"use server";
import User from "../models/user.model";
import connectToDB from "../mongoose";

export async function fetchUser(userId: string) {
	try {
		connectToDB();
		return await User.findOne({ id: userId }).populate({
			path: "communities",
			model: Communities,
		});
	} catch (error) {}
}
