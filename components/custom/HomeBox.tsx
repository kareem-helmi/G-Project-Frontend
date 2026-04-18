"use client";
import { motion, MotionProps } from "framer-motion";
import Title from "./Title";
import SubTitle from "./SubTitle";
import MainButton from "./MainButton";
import ThemeToggleDefault from "./ThemeToggleDefault";

interface HomeBoxProps {
    motionProps?: MotionProps;
    onInstitutionClick?: () => void;
    onIndividualClick?: () => void;
}

const HomeBox = ({ motionProps, onInstitutionClick, onIndividualClick }: HomeBoxProps) => {
    return (
        <motion.div
            {...motionProps}
            className="w-[90%] h-[90%] md:w-[80%] md:h-[80%] p-5 relative flex flex-col gap-8 sm:gap-12 md:gap-20 lg:gap-32 items-center justify-center rounded-[35px] shadow-[-1px_-3px_62px_11px_var(--color-bluelight-shade)]">

            <ThemeToggleDefault
                className="absolute top-5 right-5"
            />

            <div className="text-content flex flex-col">
                <Title
                    className="text-[1.8rem] md:text-[3rem] pt-25 md:mt-5 text-bluelight-1 text-center mb-0"
                    motionProps={{
                        initial: { y: -50, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { duration: 0.8 },
                    }}
                >
                    AI Disease Progression Predictor
                </Title>
                <SubTitle
                    className="text-[1.1rem] md:text-[1.5rem] text-bluelight-1/70 text-center"
                    motionProps={{
                        initial: { y: 15, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { duration: 1 },
                    }}
                >
                    AI Platform for predicting patient health progression over time
                </SubTitle>
            </div>
            <div className="actions text-center">
                <MainButton

                    onClick={onInstitutionClick}
                    className="text-[1rem] mb-0 w-70 md:text-[1.2rem] px-10 py-4 border bg-bluelight-2 hover:bg-transparent"
                    background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                    motionProps={{
                        initial: { x: -50, opacity: 0 },
                        animate: { x: 0, opacity: 1 },
                        transition: { duration: 1 },
                    }}
                >
                    Continue as <br /> Institution / Doctor
                </MainButton>
                <MainButton

                    onClick={onIndividualClick}
                    className="border w-70 text-[1rem] md:text-[1.2rem] px-10 py-4 backdrop-blur-sm bg-bluelight-2/10"
                    classHover="bg-bluelight-2 w-full h-full top-full group-hover:top-0"
                    motionProps={{
                        initial: { x: 50, opacity: 0 },
                        animate: { x: 0, opacity: 1 },
                        transition: { duration: 1 },
                    }}
                >
                    Continue as <br /> Individual user
                </MainButton>
            </div>
        </motion.div>
    )
}

export default HomeBox