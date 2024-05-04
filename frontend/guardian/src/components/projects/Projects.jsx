import { useRef } from "react";
import "./projects.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 'gen-ia',
    title: "See our demo",
    img: "../public/ia-gen.jpg",
    desc: "A first glance at our main objectiv : being able to associate a NFT for your IA generated projects.",
  },
  {
    id: 'logo',
    title: "A passport for your IA generated projects",
    img: "../public/logo-white.png",
    desc: "The idea is to be in advance on all the changes comming in the IA world. New legislation and concerns",
  },
  {
    id: 'gen-ia',
    title: "A detection and comparison system of art projects",
    img: "../public/gen-ia2.jpg",
    desc: "We want to offer a search tool in our database to certify your production and guarantee transparency in the artistic professions (cinema, drawings, literature) or with regard to faculties (dissertations).",
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <button>See Demo</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="projects" ref={ref}>
      <div className="progress">
        <h1>What we are looking forward</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Projects;
