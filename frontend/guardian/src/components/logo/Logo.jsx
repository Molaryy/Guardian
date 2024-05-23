import "./logo.scss";
import { motion } from "framer-motion";
import { Button, Card } from 'antd';
import DragAndDrop from './DragAndDrop';
import useFileSelection from './UseFileSelection';
import { Spinner } from '@chakra-ui/react';
import { useState } from "react";
import {  Client,  Payment, xrpToDrops }  from "xrpl"

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
  const [certification, setCertification] = useState("Verify")

  const verifyCertification = async () => {
    setSpin(true);
    const client = new Client("wss://s.altnet.rippletest.net:51233", {

    })
    console.log("lets get started...");
    await client.connect();

    // do something interesting here
    console.log(client);
    const { wallet: wallet1, balance: balance1 } = await client.fundWallet()
    const { wallet: wallet2, balance: balance2 } = await client.fundWallet()
    const tx = {
      TransactionType: "Payment",
      Account: wallet1.classicAddress,
      Destination: wallet2.classicAddress,
      Amount: xrpToDrops("13")
    };

    await client.submitAndWait(tx, {
      autofill: true,
      wallet: wallet1,
    });
    await client.disconnect();
    setSpin(false);
    setCertification("Certified!")

    console.log("all done!");
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
                  certification
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
