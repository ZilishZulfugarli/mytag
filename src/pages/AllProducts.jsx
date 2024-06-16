import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../styles/allproducts.module.scss';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Basket from '../components/Basket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import bgPhoto from './../images/simpleBGPhoto.jpg'

const AllProducts = () => {
    const [data, setData] = useState([]);
    const [basket, setbasket] = useState(false);
    const [basketProducts, setbasketProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productNames, setProductNames] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [searchChar, setSearchChar] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const defaultLang = localStorage.getItem('language');
            try {
                const req = await axios.get(`https://localhost:7092/api/Home/GetProducts?language=${defaultLang}`);
                if (req.status === 200) {
                    setData(req.data);
                    const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
                    setbasketProducts(existingBasket);

                    const names = req.data.map(product => product.localizations[0].name);
                    setProductNames(names);
                    setSearchedProducts(req.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

    console.log(productNames);
    console.log(data);

    useEffect(() => {
        calculateTotalPrice();
    }, [basketProducts]);

    useEffect(() => {
        if (data.length > 0) {
            const search = productNames.filter(name =>
                name.toLowerCase().startsWith(searchChar.toLowerCase())
            );

            const filtered = data.filter(item =>
                search.includes(item.localizations[0].name)
            );

            setSearchedProducts(filtered);
        }
    }, [searchChar, productNames, data]);

    const addCart = (product) => {
        setbasket(true);
        const compactProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            image: product.productImages?.[0]?.imageName,
            count: 1
        };

        const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
        const productIndex = existingBasket.findIndex(item => item.id === compactProduct.id);

        if (productIndex !== -1) {
            existingBasket[productIndex].count += 1;
        } else {
            existingBasket.push(compactProduct);
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

    const basketIconStyle = {
        display: 'flex',
        right: basketProducts && !basket && basketProducts.length > 0 ? "20px" : "-400px",
        transition: ".8s ease-in-out"
    };

    const calculateTotalPrice = () => {
        if (basketProducts.length > 0) {
            const total = basketProducts.reduce((sum, product) => sum + (product.count * product.price), 0);
            setTotalPrice(total);
        }
    };

    console.log(searchedProducts);

    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.reklamBoard}>
                    <div className={style.reklam}>
                        <img src={bgPhoto} alt="" />
                    </div>
                </div>
                <div className={style.searchContainer}>
                    <div className={style.search}>
                        <input onChange={(e) => setSearchChar(e.target.value)} type="text" placeholder='Search...' />
                    </div>
                    {/* <button className={style.searchBtn}>Search</button> */}
                </div>

                <div className={style.productContainer}>
                    {searchedProducts.length > 0 ? searchedProducts.map((product, index) => (
                        <div key={index} className={style.product}>
                            <div className={style.image}>
                                {product.productImages && product.productImages.length > 1 ? (
                                    <Slideshow images={product.productImages} />
                                ) : (
                                    <img src={product.productImages?.[0]?.imageName} alt={product.name} />
                                )}
                            </div>

                            <div className={style.productInfo}>
                                <h3>{product.localizations[0].name}</h3>
                                {/* <p>{product.description}</p> */}
                            </div>

                            <div className={style.priceContainer}>
                                <div className={style.price}>
                                    {product.discount > 0 ? <span className={style.linedText}>{product.price} AZN</span> : <p>{product.price} AZN</p>}
                                    {product.discount > 0 && <p>{product.discount} AZN</p>}
                                </div>

                                <button onClick={() => addCart(product)}>Add To Cart</button>
                            </div>
                        </div>
                    )) : <p>No products found</p>}
                </div>

                <Basket
                    basket={basket}
                    setbasket={setbasket}
                    basketProducts={basketProducts}
                    setbasketProducts={setbasketProducts}
                    totalPrice={totalPrice}
                    calculateTotalPrice={calculateTotalPrice}
                />

                <div onClick={() => setbasket(true)} style={basketIconStyle} className={style.basketIcon}>
                    <FontAwesomeIcon icon={faBasketShopping} />
                </div>
            </div>
        </>
    );
};

export default AllProducts;
