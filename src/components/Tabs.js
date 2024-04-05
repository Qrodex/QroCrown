import React, { useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import closeButton from '../assets/ic_fluent_dismiss_24_regular.svg';
import minimizeButton from '../assets/ic_fluent_subtract_24_regular.svg';
import maximizeButton from '../assets/ic_fluent_maximize_24_regular.svg';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tab-headers" data-tauri-drag-region>
        <div className='windowButtons' onClick={() => appWindow.close()}>
          <img
            src={closeButton}
            alt="close"
          />
        </div>
        <div className='windowButtons' onClick={() => appWindow.toggleMaximize()}>
          <img
            src={maximizeButton}
            alt="maximize"
          />
        </div>
        <div className='windowButtons' onClick={() => appWindow.minimize()}>
          <img
            src={minimizeButton}
            alt="minimize"
          />
        </div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-header ${index === activeTab ? 'tab-active' : ''}`}
            onClick={() => changeTab(index)}
            style={tab.rightAligned ? { float: 'right' } : {}}
            id={tab.id || ""}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
