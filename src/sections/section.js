import instagramPic from './../images/instagramPic.png'
import facebookPic from './../images/facebookPic.png'
import xPic from './../images/xPic.png'
import linkedinPic from './../images/linkedinPic.png'
import mailPic from './../images/mailIcon.png'
import callPic from './../images/callIcon.png'
const sections = [
    {name: "Instagram",img: instagramPic, link: "Instagram username*", section: "Social Media", goLink: "https://www.instagram.com/"},
    {name: "LinkedIn", img: linkedinPic, link: "LinkedIn profile link*", section: "Social Media"},
    {name: "Facebook", img: facebookPic, link: "Facebook profile link*", section: "Social Media"},
    {name: "X", img: xPic, link: "X profile link*", section: "Social Media"},
    {name: "Mail", img: mailPic, link: "Mail Address*", section: "Social Media"},
    {name: "Call", img: callPic, link: "Phone Number*", section: "Social Media"},
]

export default sections;