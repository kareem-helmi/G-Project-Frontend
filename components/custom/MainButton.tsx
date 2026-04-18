"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion, MotionProps } from "framer-motion"

interface MainButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    background?: string;
    classHover?: string;
    motionProps?: MotionProps;
    onClick?: () => void;

    type?: "button" | "submit" | "reset"; // ✅ أضف هذا السطر
    disabled?: boolean; // ✅ أضف هذا السطر
    [key: string]: any; // ✅ السماح بجميع props الأخرى
}

const MainButton = ({
    children,
    href,
    className,
    background,
    classHover,
    motionProps,
    onClick,
    type = "button",
    disabled = false
}: MainButtonProps) => {
    if (href) {
        return (
            <motion.div {...motionProps} className="inline-flex p-0 m-0">
                <Link
                    className={cn("rounded-[20px] inline-flex flex-col relative overflow-hidden p-5 m-5 text-center group", className)}
                    href={href}
                    onClick={onClick}
                >
                    <span className={cn("rounded-[20px] absolute left-0 hoverEffect", background)}></span>
                    <span className="z-10">{children}</span>
                    <span className={cn("rounded-[20px] absolute left-0 hoverEffect", classHover)}></span>
                </Link>
            </motion.div>
        )
    }
    return (
        <motion.div {...motionProps} className="inline-flex p-0 m-0">
            <button
                type={type}
                disabled={disabled}
                className={cn(
                    "rounded-[20px] inline-flex flex-col relative overflow-hidden p-5 m-5 text-center group",
                    disabled && "opacity-60 cursor-not-allowed",
                    className
                )}
                onClick={disabled ? undefined : onClick}
                aria-disabled={disabled}
            >
                <span className={cn("rounded-[20px] absolute left-0 hoverEffect", background)}></span>
                <span className="z-10">{children}</span>
                <span className={cn("rounded-[20px] absolute left-0 hoverEffect", classHover)}></span>
            </button>
        </motion.div>
    )
}

export default MainButton;