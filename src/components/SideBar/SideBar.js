import React, {useState, useEffect } from 'react'
import './sidebar.css'
import {SearchOutlined} from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SideBarChat from './SideBarChat'
import db from '../../firebase'
import { useStateValue } from '../../stateProvider';

function SideBar(){

const [rooms, setRooms] = useState([]);
const [results, setResults] = useState([])
const [{user} ,dispatch] = useStateValue();
 useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => 
      (
        setRooms(snapshot.docs.map(doc => 
          ({id: doc.id, data: doc.data(),})
                                  )
                )
      )

    )
  }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
              <Avatar src={user?.photoURL} />
              <div className="sidebar__header__right">
                <IconButton> 
                 <DonutLargeIcon />
                </IconButton>
                <IconButton>
                 <ChatIcon />
                </IconButton>
                <IconButton>
                 <MoreVertIcon />
                 </IconButton>
              </div>
            </div>
            <div className="sidebar__search">
               <div className="sidebar__search__container">
               <IconButton>
               <SearchOutlined />
               </IconButton>
               <input type="text" className="no-outline" placeholder="  Search or start new chat here" />
               </div>
            </div>
            <div className="sidebar__chats">
               <SideBarChat addNewChat />
               {
                 rooms.map(room => <SideBarChat key={room.id} id={room.id} name={room.data.name}  />)
                 
               }
    
               
            </div>

        </div>
    )
}
export default SideBar;