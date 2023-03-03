import {
	ActionIcon,
	Burger,
	Text,
	Container,
	createStyles,
	Flex,
	Group,
	Header,
	Menu,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoonStars, IconSun, TablerIcon } from "@tabler/icons";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},

	links: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	item_dropdown: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).color,
		},
	},
}));

interface HeaderSimpleProps {
	links: { link: string | (() => any); label: string; icon: TablerIcon }[];
}

export default function HeaderSimple({ links }: HeaderSimpleProps) {
	const navigator = useNavigate();

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const { classes, cx } = useStyles();

	return (
		<Header height={60} style={{ position: "absolute", top: 0, left: 0 }}>
			<Container className={classes.header}>
				<img width={32} height={32} src="/favicon-32x32.png" />
				<Group spacing={5} className={classes.links}>
					{links.map((link) => (
						<a
							key={link.label}
							href={
								typeof link.link == "function"
									? link.label
									: link.link
							}
							className={cx(classes.link, {
								[classes.linkActive]:
									typeof link.link == "function"
										? false
										: active === link.link,
							})}
							onClick={(event) => {
								event.preventDefault();
								if (typeof link.link == "function") {
									link.link();
								} else {
									setActive(link.link);
									navigator(link.link);
								}
							}}
						>
							<Flex gap={"xs"} align="center">
								<link.icon size={15} />{" "}
								<Text>{link.label}</Text>
							</Flex>
						</a>
					))}

					<ActionIcon
						variant="outline"
						color={dark ? "yellow" : "blue"}
						onClick={() => toggleColorScheme()}
						title="Toggle color scheme"
					>
						{dark ? (
							<IconSun size={18} />
						) : (
							<IconMoonStars size={18} />
						)}
					</ActionIcon>
				</Group>

				<Menu opened={opened}>
					<Menu.Target>
						<Burger
							opened={opened}
							onClick={toggle}
							className={classes.burger}
							size="sm"
						/>
					</Menu.Target>

					<Menu.Dropdown>
						{links.map((link) => (
							<Menu.Item
								key={link.label}
								className={cx(classes.link, {
									[classes.linkActive]:
										typeof link.link == "function"
											? false
											: active === link.link,
								})}
								onClick={(event) => {
									event.preventDefault();
									if (typeof link.link == "function") {
										link.link();
									} else {
										setActive(link.link);
										navigator(link.link);
									}
									toggle();
								}}
							>
								<Flex gap={"xs"} align="center">
									<link.icon size={15} />{" "}
									<Text>{link.label}</Text>
								</Flex>
							</Menu.Item>
						))}

						<Menu.Item
							key={"theme"}
							className={classes.link}
							style={{ color: dark ? "yellow" : "blue" }}
							onClick={() => {
								toggleColorScheme();
								toggle();
							}}
							title="Toggle color scheme"
						>
							{dark ? (
								<Flex gap={"xs"} align={"center"}>
									{" "}
									<IconSun size={18} /> Light{" "}
								</Flex>
							) : (
								<Flex gap={"xs"} align={"center"}>
									{" "}
									<IconMoonStars size={18} /> Dark{" "}
								</Flex>
							)}
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Container>
		</Header>
	);
}
