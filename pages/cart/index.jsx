import React from "react"
import Image from "next/image"
import styles from "./styles.module.css"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const getProducts = () => {
    return cart.products.map(product => {
      const { _id, img, title, extras, price, quantity } = product
      return (
        <tr className={styles.tr} key={_id}>
          <td>
            <div className={styles.imgContainer}>
              <Image
                src={img}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </div>
          </td>
          <td>
            <span className={styles.name}>{title}</span>
          </td>
          <td>
            <span className={styles.extras}>
              {extras.map(extra => <span key={extra._id}>{extra.text}, </span>)}
            </span>
          </td>
          <td>
            <span className={styles.price}>${price}</span>
          </td>
          <td>
            <span className={styles.quantity}>{quantity}</span>
          </td>
          <td>
            <span className={styles.total}>${price * parseInt(quantity)}</span>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {getProducts()}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${cart.total}
            </div>
            <button className={styles.button}>CHECKOUT NOW!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
