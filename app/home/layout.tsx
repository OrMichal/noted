

import { Navbar } from '@/components/navbar/navbar.component';
import Link from 'next/link';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function HomeLayout({ children }: LayoutProps) {
    
    return (
        <div>
            <Navbar>
                <Link href={"/home"}>Domů</Link>
                <Link href={"/login"}>Přihlásit se</Link>
            </Navbar>
            <section>
                {children}
            </section>
        </div>
    );
}
