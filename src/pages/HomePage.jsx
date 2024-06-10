import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../styles/homepage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import bgimage from './../images/simpleBGPhoto.jpg';
import axios from 'axios';
import Basket from '../components/Basket';

const HomePage = () => {
    const [data, setdata] = useState(null);
    const [basket, setbasket] = useState(false);
    const [basketProducts, setbasketProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const navigate = useNavigate();

    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const [country, setCountry] = useState('');

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;
                setPosition({ latitude, longitude });

                // Fetch country based on latitude and longitude
                fetchCountry(latitude, longitude);
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    const fetchCountry = async (latitude, longitude) => {
        try {
            const apiKey = '3f88b5220b3a490e9b56c56672e9bf54';
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
            if (response.data && response.data.results && response.data.results.length > 0) {
                const country = response.data.results[0].components.country_code;

                localStorage.setItem("country", country);

                const c = localStorage.getItem("country")

                console.log(c);
                setCountry(country);
            }
        } catch (error) {
            console.error('Error fetching country:', error);
        }
    };

    console.log(country);

    useEffect(() => {
        const fetch = async () => {
            try {
                const req = await axios.get(`https://localhost:7092/api/Home`);
                if (req.status === 200) {
                    setdata(req.data);
                    const existingBasket = JSON.parse(localStorage.getItem("basket")) || "";
                    setbasketProducts(existingBasket);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [basketProducts]);

    const goRegister = () => {
        navigate('/register');
    };

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

    const goProducts = () => {
        navigate('/products')
    }

    return (
        <>
            <Navbar />
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.title}>
                        <h1>Digital Business Card for Everyone</h1>
                        <h3>Create your own business card easily and for free</h3>
                        <button onClick={goRegister} className={style.registerBtn}>
                            <h3>Get your free card</h3>
                            <FontAwesomeIcon icon={faRightLong} />
                        </button>
                    </div>
                    <div className={style.firstImage}>
                        <img src={bgimage} alt="" />
                    </div>
                </div>

                <div className={style.productContainer}>
                    <div className={style.productTitle}>
                        <h1>X Products</h1>
                        <h3>Use our products everywhere</h3>
                        <button onClick={goProducts} className={style.registerBtn}>
                            <h3>Show all products</h3>
                            <FontAwesomeIcon icon={faRightLong} />
                        </button>
                    </div>
                    <div className={style.products}>
                        {data && data.slice(0, 3).map((product, index) => (
                            <div key={index} className={style.product}>
                                <div className={style.productImage}>
                                    <img src={product.productImages[0].imageName} alt="" />
                                </div>
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                                <button onClick={() => { addCart(product) }}>Add To Cart</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={style.container}>
                    <div className={style.title}>
                        <h1>Why Digital Business Card?</h1>
                        <h3>Create your own business card easily and for free</h3>
                        <button onClick={goRegister} className={style.registerBtn}>
                            <h3>Get your free card</h3>
                            <FontAwesomeIcon icon={faRightLong} />
                        </button>
                    </div>
                    <div className={style.firstImage}>
                        <img src={bgimage} alt="" />
                    </div>
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
}

export default HomePage;
