import { motion } from "framer-motion";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import MainButton from "@/components/custom/MainButton";

interface ErrorStateProps {
    error: string;
    onNewAnalysis: () => void;
    onGoToDashboard: () => void;
}

export default function ErrorState({
    error,
    onNewAnalysis,
    onGoToDashboard
}: ErrorStateProps) {
    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <Title className="text-2xl sm:text-3xl text-bluelight-1 mb-4">
                    Error Loading Results
                </Title>
                <SubTitle className="text-base sm:text-lg text-bluelight-1/70 mb-6">
                    {error}
                </SubTitle>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <MainButton
                        onClick={onNewAnalysis}
                        className="text-base px-8 py-3 border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10 transition-all duration-300"
                    >
                        Submit New Data
                    </MainButton>
                    <MainButton
                        onClick={onGoToDashboard}
                        className="text-base px-8 py-3 border transition-all duration-300 bg-bluelight-2 hover:bg-transparent"
                    >
                        Go to Dashboard
                    </MainButton>
                </div>
            </motion.div>
        </div>
    );
}