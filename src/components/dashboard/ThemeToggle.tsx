"use client";

import * as React from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {motion} from "framer-motion";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative p-2 rounded-lg bg-blue-gray-900/50 hover:bg-blue-gray-900 transition-colors border border-border"
        >
            <motion.div initial={false} animate={{rotate: theme === "dark" ? 0 : 180}} transition={{duration: 0.3}}>
                {theme === "dark" ? <Moon className="h-4 w-4 text-foreground"/> :
                    <Sun className="h-4 w-4 text-foreground"/>}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
        </motion.button>
    );
}
