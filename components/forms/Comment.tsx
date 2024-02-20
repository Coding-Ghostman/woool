"use client";

import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";

interface Props {
	threadId: string;
	currentUserImg: string;
	currentUserId: string;
}

export default function Comment({
	threadId,
	currentUserImg,
	currentUserId,
}: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		await addCommentToThread(
			threadId,
			values.thread,
			JSON.parse(currentUserId),
			pathname
		);
		form.reset();
	};

	return (
		<Form {...form}>
			<form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex w-full items-center gap-3">
							<FormLabel>
								<Image
									src={currentUserImg}
									alt="Profile Image"
									width={48}
									height={48}
									className="rounded-full object-cover"
								/>
							</FormLabel>
							<FormControl className="border-none bg-transparent">
								<Input
									type="text"
									className="no-focus text-light-1 outline-none"
									placeholder="Comment..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="comment-form_btn">
					Reply
				</Button>
			</form>
		</Form>
	);
}