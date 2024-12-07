import './notify.css';
import { NoticeToUser } from './data.jsx';

function Notification({ onClose, noticeClass}) {
    return (
        <>
            <div className={`content-of-notice ${noticeClass}`}>
                <div className="contain-text-and-close">
                    <p>Thông báo</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" 
                    className="contain-text-and-close_close" onClick={onClose}>
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </div>
                <div className="content-of-notice-line">
                    <div></div>
                </div>
                <ul className="list-of-notice">
                    {NoticeToUser.map((notice, index) => (
                        <li key={index}>
                            <div className="notice-contain-content">
                                <p>{notice.title}</p>
                                <div className="notice-contain-content-more-detail">
                                    <div className="notice__contain-more-detail _contain-more-detail">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                         className="notice__more-detail__logo">
                                            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                                        </svg>
                                        <p>{notice.senderName}</p>
                                    </div>
                                    <div className="notice__contain-more-detail _contain-more-detail">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                         className="notice__more-detail__logo">
                                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/>
                                        </svg>
                                        <p>{notice.senderDate}</p>
                                    </div>
                                    <div className="notice__contain-more-detail">
                                        <button>Chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Notification;