import Image from 'next/image'
import { useState } from 'react';
import styles from './styles.module.css'

const Featured = () => {
  const [index, setIndex] = useState(0) 

  const images = [
    "/img/featured1.jpg",
    "/img/featured2.jpg",
    "/img/featured3.jpg",
  ];
  
  const handleArrow = (direction) => { 
    if (direction === "l") setIndex(index !== 0 ? index - 1 : 2)
    if (direction === "r") setIndex(index !== 2 ? index + 1 : 0)
  }
  console.log(index)

  const  getImageSlider = images.map((img, i) => (
    <div className={styles.imgContainer} key={i}>
      <Image src={img} alt="" layout="fill" objectFit="cover" />
    </div>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {getImageSlider}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain"/>
      </div>
    </div>
  )
}

export default Featured