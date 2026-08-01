import React from 'react'
import Navigation from '@/components/Navigation'
import DemoGrid from '@/components/DemoGrid';
import { allMeta } from '@/gsap-components';

const all = () => {
    return (
        <>
            <Navigation />
            <DemoGrid entries={allMeta} />
        </>
    )
}

export default all