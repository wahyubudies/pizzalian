import React, { useState } from "react"
import Image from "next/image"
import styles from "./styles.module.css"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/cartSlice"

const Product = ({ product }) => {
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(product.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  // fungsi untuk merubah harga
  const changePrice = (number) => {
    setPrice(price + number)
  }

  // funsi untuk merubah index size
  // dan sekaligus merubah harga
  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  // fungsi untuk merubah option
  // dan merubah harga
  const handleChangeAdditionalOpt = (e, option) => {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleAddCart = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }))
  }

  // fungsi untuk meanmpilkan checkbox 
  const getAdditionalOptions = (product) => {
    return product.map((opt) => {
      return (
        <div className={styles.option} key={opt._id}>
          <input
            onChange={(e) => handleChangeAdditionalOpt(e, opt)}
            value={opt.price}
            type="checkbox"
            id={opt.text}
            name={opt.text}
            className={styles.checkbox}
          />
          <label htmlFor={opt.text}>{opt.text}</label>
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image alt="" objectFit="contain" src={product.img} layout="fill" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>

        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {getAdditionalOptions(product.extraOptions)}
        </div>

        <div className={styles.add}>
          <input onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity} />
          <button className={styles.button} onClick={handleAddCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({ params }) => {
  const product = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  )

  return {
    props: {
      product: product.data,
    },
  }
}