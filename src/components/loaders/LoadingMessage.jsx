import { motion } from 'framer-motion';

const LoadingMessage = ({withMsg = true, msg = "Loading..."}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mt-10"
        >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            {withMsg && <p className="mt-3 text-lg text-gray-500">{msg}</p>}
        </motion.div>
    );
};

export default LoadingMessage;
