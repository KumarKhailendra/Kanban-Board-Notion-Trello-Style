import { el } from "../helper.js";
import { controls } from "./topbar/controls.js";
import { logo } from "./topbar/logo.js";

export function rootLayout() {
    return el('div', { id: 'root-layout' }, [
        el('div', { class: 'app-container'}, [
            el('header', { class: 'topbar' }, [
                logo(),
                controls()
            ]),
            el('main', { class: 'main' }, [

            ])
        ])
    ]);
}