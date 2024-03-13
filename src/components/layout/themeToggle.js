import React, { useEffect, useRef } from 'react';

const themeToggle = () => {

    const themeToggleRef = useRef(null);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeToggleRef.current.checked = true;
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleRef.current.checked = false;
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeToggleRef.current.checked = true;
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.removeItem('theme')
                themeToggleRef.current.checked = false;
            }
        });
    }, []);
    const handleChangeTheme = (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }
    return (
        <label htmlFor="theme" className="theme_container">
        <span className="theme__toggle-wrap">
            <input
                ref={themeToggleRef}
                className="theme__toggle" 
                type="checkbox" 
                role="switch" 
                name="theme"
                value="dark"
                onChange={handleChangeTheme}
            />
            {/* <span className="theme__fill"></span> */}
            <span className="theme__icon">
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
                <span className="theme__icon-part"></span>
            </span>
        </span>
    </label>
    )
}

export default themeToggle
