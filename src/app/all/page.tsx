import React from 'react'
import Navigation from '@/components/Navigation'
import DemoGrid from '@/components/DemoGrid';
import { allMeta } from '@/gsap-components';

const all = () => {
    return (
        <div className="min-h-screen bg-stone-950">
            <Navigation />
            <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
                <DemoGrid entries={allMeta} />
            </main>
        </div>
    )
}

export default all
