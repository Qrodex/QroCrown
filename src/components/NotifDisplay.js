import React from 'react';
import ReactDOM from 'react-dom';

function NotificationComponent({ title, description }) {
    function dismissNotification() {
        ReactDOM.unmountComponentAtNode(document.getElementById("notifications-holder"))
    }

    return (
        <div className="notification" id="notif" style={{ display: 'inline-block' }} onClick={dismissNotification}>
            <h2 id="title-text">{title}</h2>
            <p id="text">{description}</p>
            <br />
            <hr />
            <br />
            <h4>Click to dismiss</h4>
        </div>
    );
}

function NotifDisplay(title, desc) {
    ReactDOM.render(<NotificationComponent title={title} description={desc} />, document.getElementById("notifications-holder"));
}

export default NotifDisplay;
