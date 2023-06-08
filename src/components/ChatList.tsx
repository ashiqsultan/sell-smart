import { useContext, useEffect, useState } from 'react';
import { IUserChats, getUserChats } from '../api/chats';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';

const ChatList = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<IUserChats[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userChats = await getUserChats(state.userId);
        setChatList(userChats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, [state.userId]);

  const handleCardClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  if (chatList.length === 0) {
    return (
      <Typography variant='h6' component='div'>
        No Chats Found
      </Typography>
    );
  }

  return (
    <List>
      {chatList.map((chat) => (
        <ListItem
          key={chat.chatId}
          onClick={() => handleCardClick(chat.chatId)}
        >
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant='h6' component='div'>
                {chat.receiverName}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Last message:
                {new Date(chat.updatedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
