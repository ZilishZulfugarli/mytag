import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../styles/homepage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import bgimage from './../images/simpleBGPhoto.jpg';
import axios from 'axios';
import Basket from '../components/Basket';
import { logDOM } from '@testing-library/react';

const HomePage = () => {
    const [data, setdata] = useState(null);
    const [basket, setbasket] = useState(false);
    const [basketProducts, setbasketProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const navigate = useNavigate();

    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const [country, setCountry] = useState(null);

    const [countryData, setcountryData] = useState(null);

    const [languages, setLanguages] = useState(null);

    const [defaultLang, setdefaultLang] = useState(null);

    const [mainTexts, setmainTexts] = useState(null);

    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) {
            setdefaultLang(lang);
        }
        else {
            setdefaultLang("En")
        }

    }, []);

    const fetchData = async () => {
        try {
            const req = await axios.get(`https://localhost:7092/api/Home?language=${defaultLang}`);
            const response = await axios.get(`https://localhost:7092/api/Admin/GetLanguageByAbv?abv=${defaultLang}`);

            if (response.status == 200 && localStorage.getItem('language') == null) {
                const language = response.data.langAbv;
                localStorage.setItem("language", language);
            }
            if (req.status === 200) {
                setdata(req.data.products.value);
                setLanguages(req.data.language.value)
                const existingBasket = JSON.parse(localStorage.getItem("basket")) || "";
                setbasketProducts(existingBasket);
                setmainTexts(req.data.main.value[0].homeMainLocalizations[0])
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (defaultLang != null) {
            fetchData();
        }
    }, [defaultLang]);


    console.log(mainTexts);

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
            <Navbar setdefaultLang={setdefaultLang}
                languages={languages}
                country={country} setCountry={setCountry}
                fetchData={fetchData}
                defaultLang={defaultLang} />
            {mainTexts && (

                <div className={style.main}>
                    <div className={style.container}>
                        <div className={style.title}>
                            <h1>{mainTexts.title}</h1>
                            <h3>{mainTexts.subTitle}</h3>
                            <button onClick={goRegister} className={style.registerBtn}>
                                <h3>{mainTexts.buttonText}</h3>
                                <FontAwesomeIcon icon={faRightLong} />
                            </button>
                        </div>
                        <div className={style.firstImage}>
                            <img src={mainTexts.imageName} alt="" />
                        </div>
                    </div>

                    <div className={style.productContainer}>
                        <div className={style.productTitle}>
                            <h1>{mainTexts.productTitle}</h1>
                            <h3>{mainTexts.productSubTitle}</h3>
                            <button onClick={goProducts} className={style.registerBtn}>
                                <h3>{mainTexts.productButtonText}</h3>
                                <FontAwesomeIcon icon={faRightLong} />
                            </button>
                        </div>
                        <div className={style.products}>
                            {data && data.slice(0, 3).map((product, index) => (
                                <div key={index} className={style.product}>
                                    <div className={style.productImage}>
                                        <img src={product.productImages[0].imageName} alt="" />
                                    </div>
                                    <h3>{product.localizations[0].name}</h3>
                                    <p>{product.price}</p>
                                    <button onClick={() => { addCart(product) }}>Add To Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={style.container}>
                        <div className={style.title}>
                            <h1>{mainTexts.aboutTitle}</h1>
                            <h3>{mainTexts.aboutSubTitle}</h3>
                            <button onClick={goRegister} className={style.registerBtn}>
                                <h3>{mainTexts.aboutButtonText}</h3>
                                <FontAwesomeIcon icon={faRightLong} />
                            </button>
                        </div>
                        <div className={style.firstImage}>
                            <img src={mainTexts.aboutImageName} alt="" />
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
            )}

        </>
    );
}

export default HomePage;
