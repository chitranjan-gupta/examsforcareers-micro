import React, { useEffect, useState}from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Error from './components/Error';
import './App.css';
import Open from './components/Open';
import State from './components/State';
import UserChoice from './components/UserChoice';
import User from './components/User';
import Others_Exams from './components/Others_Exams';
import Defence_Exams from './components/Defence_Exams';
import Medical_Exams from './components/Medical_Exams';
import Central_Exams from './components/Central_Exams';
import Engineering_exams from './components/Engineering_exams';
import State_Exams from './components/State_Exams';
import logo_main from './images/logo_main.png';
import lines from './images/lines.svg';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Signout from './components/Signout';
import Loading from './components/Loading';
import Disclaimer from './components/Disclaimer';
import Search from './components/Search';
import Privacy from './components/Privacy';
import Details from './components/Details';
import ViewAll from './components/ViewAll';

function App(){
  document.title = "examsforcareers.com";
  const [loading, setLoading] = useState(false);
  function $(id){
    return document.querySelector(id);
  }
  useEffect(()=> {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },5000);
  },[]);
  useEffect(()=>{
    if(!loading){
      const triggers = $('#menuChoice').querySelectorAll('a');
      const highlight = document.createElement('span');
      highlight.classList.add('highlight');
      $('#menuChoice').appendChild(highlight);
      function highlightLink() {
        const linkCoords = this.getBoundingClientRect();
        const coords = {
          width: linkCoords.width,
          height: linkCoords.height,
          top: linkCoords.top + window.scrollY,
          left: linkCoords.left + window.scrollX
        };
        highlight.style.width = `${coords.width+12}px`;
        highlight.style.height = `5px`;
        highlight.style.transform = `translate(${coords.left-5}px, 40.5px)`;
      }
      triggers.forEach(a => a.addEventListener('mouseenter',highlightLink));
      const Droptriggers = document.querySelectorAll('.DropBox');
      const background  = $('.dropdownBackground');
      const nav  = $('#menuChoice');
      function handleEnter() {
        this.classList.add('trigger-enter');
        setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
        background.classList.add('open');
        const dropdown = this.querySelector('.dropdown');
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();
        const coords = {
          height: dropdownCoords.height,
          width: dropdownCoords.width,
          top: dropdownCoords.top - navCoords.top,
          left: dropdownCoords.left - navCoords.left
        };
        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        background.style.setProperty('transform', `translate(${coords.left}px, 60.5px)`);
      }
      function handleLeave() {
        this.classList.remove('trigger-enter', 'trigger-enter-active');
        background.classList.remove('open');
      }
      Droptriggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
      Droptriggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
    }
  });
  var isDropped = false;
  const dropDown = () => {
    const el = $("#menuBar");
    const menuContent = $("#menuContent");
    el.classList.toggle("showMenu");
    if(el.classList.contains("showMenu")){
      isDropped = true;
    }else{
      isDropped = false;
    }
    el.addEventListener('transitionrun',()=>{
      el.style.zIndex = "3";
    });
    el.addEventListener('transitionstart',()=>{
      el.style.zIndex = "3";
      if(!isDropped){
        menuContent.style.visibility = "hidden";
      }
    });
    el.addEventListener('transitioncancel',()=>{
        
    });
    el.addEventListener('transitionend',()=>{
      menuContent.style.visibility = "visible";
      if(!isDropped){
        el.style.zIndex = "1";
        menuContent.style.visibility = "hidden";
      }
    });
  };
  return (
    <div className="App">
      {
        loading?
          <Loading/>
        :
          <>
            <div className="toolbar">
              <div className="brand">
                <div className="logo">
                  <img alt="logo" src={logo_main}/>
                </div>
                <span>
                  <h1>
                    examforcareers.
                    <b className="th">com</b>
                  </h1>
                </span>
              </div>
              <div className="drop" onClick={dropDown}>
                <img alt="Drop" src={lines}/>
              </div>
              <div id="menuChoice" className="menu">
                <div className="dropdownBackground">
                  <span className="arrow"></span>
                </div>
                <div>
                  <NavLink exact to="/home">Home</NavLink>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/central_exams">Central Exams</NavLink>
                  <div className="dropdown">Exams Conducted On Central Level</div>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/state_exams">State Exams</NavLink>
                  <div className="dropdown">Exams Conducted By Respective States</div>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/engineering_exams">Engineering Exams</NavLink>
                  <div className="dropdown">Exam Which Leads To Admission In Engineering Courses</div>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/medical_exams">Medical Exams</NavLink>
                  <div className="dropdown">Exam Which Leads To Admission In Medical Courses</div>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/defence_exams">Defence Exams</NavLink>
                  <div className="dropdown">Exam Which Leads To Job In Defence Profession</div>
                </div>
                <div className="DropBox">
                  <NavLink exact to="/others_exams">Others Exams</NavLink>
                  <div className="dropdown">Other Categories Of Exams</div>
                </div>
              </div>
            </div>
            <div id="menuBar" className="menubar">
              <section id="menuContent">
                <div>
                  <NavLink exact to="/home">Home</NavLink>
                </div>
                <div>
                  <NavLink exact to="/central_exams">Central Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/state_exams">State Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/engineering_exams">Engineering Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/medical_exams">Medical Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/defence_exams">Defence Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/others_exams">Others Exams</NavLink>
                </div>
                <div>
                  <NavLink exact to="/signin">Sign In</NavLink>
                </div>
                <div>
                  <NavLink exact to="/signup">Sign Up</NavLink>
                </div>
              </section>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/details/:exam" component={Details}></Route>
                <Route exact path="/show/:type" component={ViewAll}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/signin" component={Signin}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/central_exams" component={Central_Exams}></Route>
                <Route exact path="/central_exams/:exam" component={Open}></Route>
                <Route exact path="/search/:exam" component={Search}></Route>
                <Route exact path="/state_exams" component={State_Exams}></Route>
                <Route exact path="/state_exams/:state" component={State}></Route>
                <Route exact path="/state_exams/:state/:exam" component={Open}></Route>
                <Route exact path="/engineering_exams" component={Engineering_exams}></Route>
                <Route exact path="/engineering_exams/:exam" component={Open}></Route>
                <Route exact path="/medical_exams" component={Medical_Exams}></Route>
                <Route exact path="/medical_exams/:exam" component={Open}></Route>
                <Route exact path="/defence_exams" component={Defence_Exams}></Route>
                <Route exact path="/defence_exams/:exam" component={Open}></Route>
                <Route exact path="/others_exams" component={Others_Exams}></Route>
                <Route exact path="/contactus" component={Contact}></Route>
                <Route exact path="/disclaimer" component={Disclaimer}></Route>
                <Route exact path="/privacy_policy" component={Privacy}></Route>
                <Route exact path="/user" component={User}></Route>
                <Route exact path={`/user/:exams`} component={UserChoice}></Route>
                <Route exact path="/admin" component={Admin}></Route>
                <Route exact path="/signout" component={Signout}></Route>
                <Route exact path="/404" component={Error}></Route>
                <Route component={Error}></Route>
              </Switch>
            </div> 
          </>
      }
    </div>
  );
}

export default App;