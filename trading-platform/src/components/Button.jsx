import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
    const baseStyles = "relative overflow-hidden rounded-lg font-medium transition-all duration-300 focus:outline-none flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-blue-600 text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] border border-primary/20",
        secondary: "bg-surfaceLight text-white border border-gray-800 hover:bg-gray-800 hover:border-gray-600",
        outline: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        danger: "bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-[0_0_20px_rgba(255,46,46,0.3)]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};
