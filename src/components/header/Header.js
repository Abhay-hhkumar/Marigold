import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/website-logo.svg";;

const Header = () => {

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    //"location " contain the value of route
    // whenever we change our route the our scroll doesnot come to top automatically 
    // To make the scroll at the top Y==0 we use the below method
    useEffect(()=>{

      window.scrollTo(0,0)
    },[location]);


     // change backgrounnd color of header background  when we scroll Y to 200
    const controlNavbar = ()=>{
    // window.scrollY telll how much you have scroll the window
      //  console.log(window.scrollY);
        if(window.scrollY >  200){
           if(window.scrollY > lastScrollY && !mobileMenu){
              setShow("hide");
             }else{
               setShow("show");
                   }
        }else{
               setShow("top")
             }
             setLastScrollY(window.scrollY);
             }

             
             
    useEffect(()=>{
               window.addEventListener('scroll', controlNavbar);
 
               return ()=> {
               window.removeEventListener("scroll",controlNavbar);
                  }

               },[lastScrollY])

      // handle the search icon and search bar
      const searchQueryHandler = (event) =>{
        if(event.key === "Enter" && query.length > 0){

          // whatever we write on search text area we store those text in "query"
         navigate(`/search/${query}`);
            ///  close the search bar after 1 second
           setTimeout( ()=>{
             setShowSearch(false)
               },1000);
              }
      }

      // toggle the appear and dissappear of search icon
    const openSearch = () => {

         setMobileMenu(false);
         setShowSearch(true)
       }
    const openMobileMenu =()=>{
        setMobileMenu(true);
        setShowSearch(false);
      }

    // navigate the route when we select the "movie" or "tv" from the "menu" "icon";

    const navigationHandler =(type)=>{
      if(type ==="movie"){
           navigate("/explore/movie")
        }else{
            navigate("explore/tv")
          }
      setMobileMenu(false);
    }


  

    return (

      // by default "header" class will be present always but if mobileMenu get true the "mobileView" class will also get added
       // if "mobileMenu " dosent get true the no new class will be added (i.e only dafault "header" class will be there)
       // "${show}" is use to give transparent background strip-color to header
       <header className = {` header  ${mobileMenu ? "mobileView" : "" } ${show}`}>
        <ContentWrapper>
          <div className = "logo" onClick = { () => navigate("/") } >
            <img src={logo} alt = ""/> <p className = "logoHeading"> MARIGOLD </p>
          </div>
          <ul className = "menuItems">
            <li className = "menuItem" onClick = {  () => navigationHandler("movie") }> Movies   </li>
            <li className = "menuItem"  onClick = { () => navigationHandler("tv")    }> TV Shows </li>
            <li className = "menuItem">
              <HiOutlineSearch onClick = {openSearch} />
            </li>
          </ul>

          <div className = "mobileMenuItems">
          <HiOutlineSearch onClick = {openSearch} />
          {/* // 'mobileMenu' use to switch the menu button according to mobile mode or desktop mode */}
          { mobileMenu ? ( <VscChromeClose onClick={ () => setMobileMenu(false)} /> ) : ( <SlMenu onClick={openMobileMenu}/> )}
          
          </div>
        </ContentWrapper>

        {/* // handle the search icon */}
       
       {    showSearch && (
        <div className = "searchBar">
          <ContentWrapper>

          <div className = 'searchInput'>
          <input type = "text" onChange = { (e) => setQuery(e.target.value)} onKeyUp = { searchQueryHandler } placeholder="Search for movie or TV show.." />
          <VscChromeClose onClick = { () => setShowSearch(false)} />
          {/* "VscChromeClose" is a cross icon */}
        </div>

          </ContentWrapper>
        </div>
       )}
       </header>
    );
};

export default Header;