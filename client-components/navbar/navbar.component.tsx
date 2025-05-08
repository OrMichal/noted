interface NavbarProps {
	children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
	return (
		<nav className="w-full bg-white dark:bg-zinc-900 shadow-md px-6 py-4 fixed">
			<div className="max-w-6xl mx-auto flex items-center justify-between">
				{children}
			</div>
		</nav>
	);
}
