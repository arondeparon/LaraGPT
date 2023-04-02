import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import {RouteContext} from '@/Hooks/useRoute';
import {createRoot} from "react-dom/client";

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';



createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        return pages[`./Pages/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <RouteContext.Provider value={(window as any).route}>
                <App {...props} />
            </RouteContext.Provider>
        )
    },
})

