import "./logo.scss";
import { motion } from "framer-motion";
import { Button, Card } from 'antd';
import DragAndDrop from './DragAndDrop';
import useFileSelection from './UseFileSelection';
import { Spinner } from '@chakra-ui/react';
import { useState } from "react";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType:"mirror",
      duration: 20,
    },
  },
};


const Logo = ({user}) => {
  const [spin, setSpin] = useState(false);

  const verifyCertification = async () => {
    setSpin(true);
    /* const res = await fetch("http://localhost:3000/image/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adress: user,
      }),
    })
    if (res.status != 200) {
      // TODO: handle failing
    }
    // TODO: certified */
  }
  const [addFile, removeFile] = useFileSelection();
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>Guardian</motion.h2>
          <motion.h1 variants={textVariants}>
            A certification for IA
          </motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <motion.button variants={textVariants}>
              See our objectivs
            </motion.button>
            <motion.button variants={textVariants}>Join the project</motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
          {user ? <Card className="dragndrop" actions={[]}>
            <DragAndDrop addFile={addFile} removeFile={removeFile} />
          </Card> : ''}
          {user ? <button className="dragndrop-button" onClick={verifyCertification} >
            {
              spin? (
                <Spinner
                  className="spinner"
                  speed='0.65s'
                  color='blue.500'
                  size='xl'
                />
              ) : (
                "Verify"
              )
            }
            </button> : ''}
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Bring control between art and IA
      </motion.div>
    </div>
  );
};

export default Logo;
