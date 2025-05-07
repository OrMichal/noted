interface NavbarProps {
	children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
	return (
		<div className=" flex gap-4 ">
			<h1>Navbar</h1>
			{children}
		</div>
	);
}
