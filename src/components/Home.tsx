import {
	ActionIcon,
	Center,
	Flex,
	LoadingOverlay,
	Popover,
	Text,
	TextInput,
} from "@mantine/core";
import {
	IconArrowLeft,
	IconBook,
	IconDeviceTv,
	IconGrowth,
	IconTree,
} from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import Tree from "../components/Tree";
import { Media, Type } from "../types/anime";
import { getMediaAndRecommendationsFromSearch } from "../utils/anime";
import { animeExamples, mangaExamples } from "../utils/examples";

interface HomeProps { }

export default function Home({ }: HomeProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [data, setData] = useState<Media>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [placeholder, setPlaceholder] = useState<string>(animeExamples[0]);

	const [shouldUseCluster, setShouldUseCluster] = useState(false);

	const [typeChooserOpen, setTypeChooserOpen] = useState(false);
	const [type, setType] = useState<Type>("ANIME");
	const toggleTypeChooser = () => {
		setTypeChooserOpen(!typeChooserOpen);
	};

	useEffect(() => {
		inputRef.current && inputRef.current.focus();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const examples = type == "ANIME" ? animeExamples : mangaExamples
			const newIndex = examples.indexOf(placeholder) + 1;
			if (newIndex < examples.length) {
				setPlaceholder(examples[newIndex]);
			} else {
				setPlaceholder(examples[0]);
			}
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, [placeholder]);

	const getData = async (e: any) => {
		e.preventDefault();
		if (inputRef.current) {
			setLoading(true);
			try {
				setData(
					await getMediaAndRecommendationsFromSearch(
						inputRef.current.value,
						type,
						5,
					),
				);
			} catch {
				setError("Failed to fetch anime");
			}
			setLoading(false);
		}
	};

	return (
		<Center style={{ height: "100vh" }}>
			<LoadingOverlay visible={loading} />
			{data ? (
				<>
					<ActionIcon
						onClick={() => setData(undefined)}
						style={{ position: "absolute", right: 20, top: 80 }}
						variant="filled"
						size={30}
						radius="xl"
					>
						<IconArrowLeft size={"xl"} />
					</ActionIcon>
					<ActionIcon
						onClick={() => setShouldUseCluster(!shouldUseCluster)}
						style={{ position: "absolute", right: 20, top: 130 }}
						variant="filled"
						size={30}
						radius="xl"
					>
						{shouldUseCluster ? (
							<IconTree size={"xl"} />
						) : (
							<IconGrowth size={"xl"} />
						)}
					</ActionIcon>
					<Tree shouldUseCluster={shouldUseCluster} data={data} />
				</>
			) : (
				<form>
					<Flex align="center" justify="stretch" gap={"xs"}>
						<Popover
							transition={"rotate-right"}
							transitionDuration={150}
							opened={typeChooserOpen}
							onChange={setTypeChooserOpen}
						>
							<Popover.Target>
								<ActionIcon
									size={"xl"}
									onClick={toggleTypeChooser}
									variant="filled"
								>
									{type == "ANIME" ? (
										<IconDeviceTv />
									) : (
										<IconBook />
									)}
								</ActionIcon>
							</Popover.Target>
							<Popover.Dropdown
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<Flex gap={"md"}>
									<ActionIcon
										onClick={() => {
											setType("ANIME");
											setTypeChooserOpen(false);
										}}
									>
										<IconDeviceTv />{" "}
									</ActionIcon>
									<ActionIcon
										onClick={() => {
											setType("MANGA");
											setTypeChooserOpen(false);
										}}
									>
										<IconBook />{" "}
									</ActionIcon>
								</Flex>
							</Popover.Dropdown>
						</Popover>
						<TextInput
							ref={inputRef}
							variant="filled"
							placeholder={placeholder}
							size="lg"
							error={error}
						/>
					</Flex>
					<input
						type="submit"
						onClick={getData}
						style={{ display: "none" }}
					/>
				</form>
			)}
		</Center>
	);
}
