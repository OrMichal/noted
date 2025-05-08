interface NavbarProps {
	children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
	return (
		<div className=" fixed flex gap-4 w-full h-16 items-center justify-between bg-gray-800 text-white p-4 shadow-md">
			{children}
		</div>
	);
}
