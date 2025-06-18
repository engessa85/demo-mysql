import React from "react";
import { motion } from "framer-motion";

export const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      {icon}
      <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};
