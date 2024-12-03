import './message.css';
import { ReceivedMessage } from './data.jsx';

function MessageReceive({ onClose, divClass }) {
    return (
        <div className={`content-of-mail ${divClass}`}>
            <div className="content_of_mail">
                <div className="contain-text-and-close">
                    <p>Tin nhắn</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" 
                    className="contain-text-and-close_close" onClick={onClose}>
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                
                <div className="content-of-mail-line">
                    <div></div>
                </div>
                <ul className="list-of-message">
                    {ReceivedMessage.map((mes, index) => (
                        <li key={index}>
                            <img src={require(`${mes.img}`)} alt="" />
                            <div className="name-sender-and-content">
                                <div className="name-sender-and-time">
                                    <p className="name-sender__name">
                                        {mes.senderName}
                                    </p>
                                    <p className="name-sender__time">
                                        {mes.senderTime}
                                    </p>
                                </div>
                                <div className="message-sent-content">
                                    <p className="message-sent-content__text">
                                        {mes.content}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MessageReceive;