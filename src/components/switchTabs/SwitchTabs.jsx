import React,{useState} from 'react';
import './style.scss';

const SwitchTabs = ({data, onTabChange}) => {
    const [selectedTab,setSelectedTab]=useState(0);
    const [left, setLeft]=useState(0);
    const activeTab = (tab, index)=>{
        // we multiply by 100  "index*100"  because because width of each tab(i.e .movieBg) is 100px
        setLeft(index*100)

        // to make the background animation smooth we use below code
        setTimeout(()=>{
            setSelectedTab(index);
        }, 300);

        // after we change the tab then we call the api to fetch data
        onTabChange(tab, index)
    }
  return (
    <div className='switchingTabs'>
    <div className='tabItems'>
        {data.map( (tab, index)=>(
            <span 
             key={index} 
             className={`tabItem ${selectedTab === index ? "active" : ""}`} 
             onClick={()=>activeTab(tab, index)}>

             {tab}

            </span>
        ))}
        <span className='movingBg' style={{ left:left}}/>
    </div>
      
    </div>
  )
}

export default SwitchTabs
