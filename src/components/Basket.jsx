import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faMinus, faPlus, faRightLong, faXmark } from '@fortawesome/free-solid-svg-icons';
import bgimage from './../images/simpleBGPhoto.jpg';
import style from '../styles/basket.module.scss';

const Basket = ({
    basket,
    setbasket,
    basketProducts,
    setbasketProducts,
    totalPrice,
    calculateTotalPrice
}) => {

    const changeCount = (product, count) => {
        const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const productIndex = existingBasket.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            count = parseInt(count, 10);
            if (isNaN(count) || count <= 0) {
                count = 1;
            }
            existingBasket[productIndex].count = count;
        } else {
            product.count = 1;
            existingBasket.push(product);
        }

        try {
            localStorage.setItem("basket", JSON.stringify(existingBasket));
            setbasketProducts(existingBasket);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded!');
                alert('Cannot add more items to the cart. Storage limit reached.');
            } else {
                console.error(e);
            }
        }
    };

    const minusProduct = (product, count) => {
        const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const productIndex = existingBasket.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            count -= 1;
            if (isNaN(count) || count <= 0) {
                count = 1;
            }
            existingBasket[productIndex].count = count;
        } else {
            product.count = 1;
            existingBasket.push(product);
        }

        try {
            localStorage.setItem("basket", JSON.stringify(existingBasket));
            setbasketProducts(existingBasket);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded!');
                alert('Cannot add more items to the cart. Storage limit reached.');
            } else {
                console.error(e);
            }
        }
    };

    const plusProduct = (product, count) => {
        const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const productIndex = existingBasket.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            count += 1;
            if (isNaN(count) || count <= 0) {
                count = 1;
            }
            existingBasket[productIndex].count = count;
        } else {
            product.count = 1;
            existingBasket.push(product);
        }

        try {
            localStorage.setItem("basket", JSON.stringify(existingBasket));
            setbasketProducts(existingBasket);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded!');
                alert('Cannot add more items to the cart. Storage limit reached.');
            } else {
                console.error(e);
            }
        }
    };

    const removeProduct = (product) => {
        const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const productIndex = existingBasket.findIndex(item => item.id === product.id);

        existingBasket.splice(productIndex, 1);

        try {
            localStorage.setItem("basket", JSON.stringify(existingBasket));
            setbasketProducts(existingBasket);

            if (existingBasket.length === 0) {
                localStorage.removeItem('basket');
            }
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded!');
                alert('Cannot add more items to the cart. Storage limit reached.');
            } else {
                console.error(e);
            }
        }
    };

    const closeBasket = () => {
        setbasket(false);
    };

    const basketStyle = {
        display: 'flex',
        right: basket && basketProducts.length > 0 ? "0" : "-400px",
        transition: ".3s ease-in-out",
    };

    return (
        <>
            <div style={basketStyle} className={style.basket}>
                <div className={style.title}>
                    <h3>Shopping Cart</h3>
                    <FontAwesomeIcon onClick={closeBasket} icon={faRightLong} />
                </div>

                <div className={style.products}>
                    {basketProducts && basketProducts.map((product, index) => (
                        <div key={index} className={style.product}>
                            <div className={style.productInfo}>
                                <img src={product.image} alt="" />
                                <div className={style.infoStyle}>
                                    <h4>{product.name}</h4>
                                    <p>{product.price} AZN</p>
                                </div>
                            </div>
                            <div className={style.count}>
                                <div className={style.countStyle}>
                                    <div style={{ cursor: "pointer" }} className={style.box}>
                                        <FontAwesomeIcon onClick={() => minusProduct(product, product.count)} icon={faMinus} />
                                    </div>
                                    <div style={{ borderRadius: "0" }} className={style.box}>
                                        <input onChange={(e) => { changeCount(product, e.target.value); }} type="text" value={product.count} />
                                    </div>
                                    <div style={{ borderRadius: "0 5px 5px 0", cursor: "pointer" }} className={style.box}>
                                        <FontAwesomeIcon onClick={() => plusProduct(product, product.count)} icon={faPlus} />
                                    </div>
                                    <FontAwesomeIcon onClick={() => { removeProduct(product) }} className={style.xMark} icon={faXmark} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.line}></div>

                <div className={style.priceSection}>
                    <div className={style.shipping}>
                        <h3>Shipping:</h3>
                        <p>Free</p>
                    </div>

                    <div className={style.shipping}>
                        <h3>Total Price:</h3>
                        <p>{totalPrice} AZN</p>
                    </div>
                </div>

                <div className={style.confirm}>
                    <button className={style.checkoutBtn}>CHECKOUT</button>
                </div>
            </div>
        </>
    );
}

export default Basket;
