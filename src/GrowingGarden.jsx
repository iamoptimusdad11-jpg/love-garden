import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GrowingGarden(){
  const [plants,setPlants]=useState(()=>{
    const saved=localStorage.getItem("plants");
    return saved?JSON.parse(saved):[];
  });

  useEffect(()=>{ localStorage.setItem("plants",JSON.stringify(plants)); },[plants]);

  const growPlant=()=>{
    const newPlant={
      id:Date.now(),
      height:Math.random()*120+60,
      color:`hsl(${Math.random()*40+330} 70% 55%)`,
      bloomDelay:Math.random()*1+0.6
    };
    setPlants([...plants,newPlant]);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      <h1 className="text-5xl font-bold text-rose-700 mb-4 drop-shadow-md">Love Garden</h1>
      <p className="text-lg text-rose-900 mb-8 max-w-xl text-center">
        Every tap lets something beautiful grow — shaped by love, blooming uniquely.
      </p>

      <button
        onClick={growPlant}
        className="px-7 py-4 mb-10 text-white bg-loveRose rounded-2xl shadow-glow hover:bg-pink-500 transition-all"
      >
        Plant Love
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
        {plants.map((plant)=>(
          <motion.div
            key={plant.id}
            initial={{opacity:0,scale:0}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.6}}
            className="flex flex-col items-center"
          >
            <motion.div
              className="rounded-t-3xl w-12 shadow-glow"
              style={{backgroundColor:plant.color}}
              initial={{height:0}}
              animate={{height:plant.height}}
              transition={{duration:1.4}}
            />

            <motion.div
              className="w-6 h-6 rounded-full bg-pink-300 mt-3 shadow-glow"
              initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              transition={{delay:plant.bloomDelay}}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
