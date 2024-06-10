import React, { useEffect, useState } from 'react';
import style from '../styles/subscribe.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Subscribe = () => {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const userSubscription = userData.userInfo.categoryId;
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchSubscriptionData = async () => {
            try {
                const response = await axios.get(`https://localhost:7092/api/Account/GetSubscription`);
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching subscription data:', error);
            }
        };

        fetchSubscriptionData();
    }, []);

    console.log(categories);
    console.log(userSubscription);

    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>Get Started with the Leading Digital Business Card</p>
            </div>
            <div className={style.cards}>
                {categories.length > 0 && categories.map(category => (
                    <div className={style.card} key={category.id}>
                        <p>{category.categoryName}</p>
                        <h3>{category.categoryPrice == 0 ? "Free" : category.categoryPrice}</h3>
                        <div className={style.subscribeBtn}>
                            <p>{userSubscription == category.id ? "Current Subscription" : "Subscribe Now"}</p>
                        </div>
                        <div className={style.line}></div>
                        <ul>
                            {category.categoryAdvantages.map(adv => (
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    {adv.text}
                                </li>
                            ))}

                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscribe;
