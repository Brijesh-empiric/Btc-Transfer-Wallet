import React, { useEffect, useRef } from 'react';
import avatarImg from 'assets/images/avatar.png';
import { Grid, Input, Button, Message } from 'semantic-ui-react';

const Chat = ({
  onReply,
  messageList,
  value,
  loadingMessage,
  sendingMessage,
  handleOnKeyPress,
  handleOnMessageType,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div>
      <div className="chat__box mb-3">
        {loadingMessage && (
          <Message info className="mt-4" compact>
            Loading All message!!!!
          </Message>
        )}
        {!loadingMessage && messageList && messageList.length === 0 && (
          <Message info className="mt-4" compact>
            No conversation started yet!!!!
          </Message>
        )}
        {messageList &&
          messageList.length > 0 &&
          messageList.map((message, index) => {
            if (message.is_admin_message) {
              return (
                <div key={index} className="d-flex py-2 px-3 flex-row-reverse">
                  <div className="image__icon ml-2">
                    <img className="img-fluid" src={avatarImg} alt="" />
                  </div>
                  <div className="text-right">
                    <span className="primary px-2">Admin</span>
                    <p className="gray-300 chat__message">{message.message}</p>
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className="d-flex  py-2 px-3">
                <div className="image__icon mr-2">
                  <img className="img-fluid" src={avatarImg} alt="" />
                </div>
                <div>
                  <span className="primary px-2">Customer</span>

                  <p className="white chat__message chat__message--reply">
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })}
        {/** Dummy div for auto scroll to bottom do not delete this div */}
        <div ref={messagesEndRef} />
      </div>

      <Grid>
        <Grid.Row>
          <Grid.Column width={13}>
            <Input
              fluid
              value={value || ''}
              iconPosition="left"
              placeholder="Reply"
              icon="paper plane outline"
              onKeyPress={handleOnKeyPress}
              onChange={handleOnMessageType}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button disabled={loadingMessage} onClick={onReply} size="large">
              Reply
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Chat;
