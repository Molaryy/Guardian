import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          We secure the path for
          <br /> a better future in IA
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/team-image.png" alt="" />
          <h1>
            <motion.b whileHover={{color: "rgb(167, 77, 189)"}}>Unique</motion.b> Idea
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{color: "rgb(167, 77, 189)"}}>To Certify your IA Projects</motion.b> ✓
          </h1>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Mohamed Jbilou</h2>
          <p>
            Second year student at Epitech Rennes.
            POC president.
            Software Developper, Back-end & coordinator.
          </p>
          <a href="https://www.linkedin.com/in/mohammed-jbilou768/">
              <button className="linkedin">Go to Linkedin</button>
          </a>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Matthias von Rakowski</h2>
          <p>
            Second year student at Epitech Lyon.
            POC vice-president and IA module manager.
            IA Developpper + API.
          </p>
          <a href="https://www.linkedin.com/in/matthias-von-rakowski-97a1b0265/">
              <button className="linkedin">Go to Linkedin</button>
          </a>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Gustave Delecroix</h2>
          <p>
            First year student at Epitech Paris.
            POC resident.
            Back-end Developper + NFTs.
          </p>
          <a href="https://www.linkedin.com/in/gustave-delecroix-944992263/">
            <button className="linkedin">Go to Linkedin</button>
          </a>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Hugo Hamet</h2>
          <p>
            First year student at Epitech Rennes.
            POC resident.
            Front-end Developper + Demo.
          </p>
          <a href="">https://www.linkedin.com/in/hugo-hamet/
              <button className="linkedin">Go to Linkedin</button>
          </a>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Elie Stroun</h2>
          <p>
            First year student at Epitech Rennes.
            POC resident.
            Front-end Developper.
          </p>
          <a href="https://www.linkedin.com/in/elie-stroun-6b91372a1/">
              <button className="linkedin">Go to Linkedin</button>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
