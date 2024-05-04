import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";
import Wallet from "./Wallet.jsx";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
        <div className="wrapper">
            <motion.span
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                Guardian
                <div className="imageContainer">
                    <img src="/logo-white.png" alt=""/>
                </div>
            </motion.span>
            <Wallet/>
        </div>
    </div>
  );
};

export default Navbar;
