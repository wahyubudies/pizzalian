import React from "react"
import ProductCard from "../ProductCard"
import styles from "./styles.module.css"

const ProductList = ({ productList }) => {
  const getListProducts = productList.map(product => (
    <ProductCard key={product._id} product={product} />
  ))

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>{getListProducts}</div>
    </div>
  )
}

export default ProductList