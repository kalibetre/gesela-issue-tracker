import React from 'react';
import Button from '../Button/Button';
import '../Common/Cards.css';
import Logo from '../Logo/Logo';

const MessageCard = (props) => {
    const { action, title, subtitle } = props;

    return (
        <div className="card-msg-container ">
            <div className="card-msg">
                <div className="card-msg-header">
                    <Logo />
                </div>
                <div className="card-msg-content">
                    <h2 className="card-msg-title">{title}</h2>
                    <p className="card-msg-text">{subtitle}</p>
                    {action && (
                        <div className="card-msg-action">
                            <Button
                                className="btn btn-primary"
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
