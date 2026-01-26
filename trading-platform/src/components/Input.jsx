import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const Input = ({ label, type = 'text', className, ...props }) => {
    const { theme } = useTheme();

    // Theme-based styles
    const isDark = theme === 'dark';

    const baseInputStyles = "w-full rounded-xl px-4 py-4 outline-none transition-all duration-300 peer placeholder-transparent border-2";

    const themeStyles = isDark
        ? "bg-[#1A1A1A] border-[#333] text-white focus:border-primary focus:bg-[#0A0A0A] focus:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
        : "bg-white border-gray-200 text-gray-900 focus:border-primary focus:bg-white focus:shadow-[0_0_15px_rgba(37,99,235,0.1)]";

    const labelStyles = isDark
        ? "text-gray-400 peer-focus:text-primary peer-focus:bg-[#050505]"
        : "text-gray-500 peer-focus:text-primary peer-focus:bg-[#f5f5f5]";

    const bgColor = isDark ? '#050505' : '#f5f5f5';

    return (
        <div className="relative group">
            <input
                type={type}
                className={`${baseInputStyles} ${themeStyles} ${className || ''}`}
                placeholder={label}
                {...props}
            />

            <label
                className={`absolute left-4 transition-all pointer-events-none px-1 py-0 z-10
          peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:font-bold
          -top-2.5 text-xs font-bold
          ${labelStyles}
        `}
                style={{
                    // Fallback for label background to match page background when floating
                    backgroundColor: props.value || document.activeElement === props.ref ? bgColor : 'transparent'
                }}
            >
                {label}
            </label>

            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 blur-md -z-10 opacity-0 peer-focus:opacity-100 ${isDark
                    ? 'bg-gradient-to-r from-primary/20 to-purple-600/20'
                    : 'bg-gradient-to-r from-blue-400/20 to-indigo-500/10'
                }`}
            />
        </div>
    );
};
