import React from "react";

import "./HomeDashboard.css";
const messagesList = [
  {
    sender: "M",
    time: "9 minutes ego",
    message: "A new message from .....",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const MessageNotification = () => {
  return (
    <div>
      <h5>Message Notification</h5>
      <p>To read complete text go to message from the left bar.</p>
      <div className="rounded">
        {Array.from({ length: 5 }).map((_, i) =>
          messagesList.map((data) => (
            <div key={i} className="messages">
              <div className="circleShape">{data.sender} </div>
              <div>
                <div className="message">{data.message}</div>
                <div>{data.content}</div>
              </div>
              <div>
                <span>{data.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageNotification;
