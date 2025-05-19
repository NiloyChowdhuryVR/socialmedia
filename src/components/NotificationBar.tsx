"use client"
import { getNotifications, markNotificationsAsRead } from '@/actions/notification.action';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Skeleton } from './ui/skeleton';
import { useUser } from '@clerk/nextjs';

type Notifications = Awaited<ReturnType<typeof getNotifications>>;
type Notification = Notifications[number];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <FavoriteIcon className='text-[var(--btn-color)]'/>;
    case "COMMENT":
      return <ModeCommentIcon className='text-[var(--btn-color)]'/>;
      case "FOLLOW":
          return <ShareIcon className='text-[var(--btn-color)]'/>;
          default:
              return null;
            }
        };

    const NotificationBar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);
        
        const unreadIds = data.filter((n) => !n.read).map((n) => n.id);
        if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  if(!user.user) return null;
  
  


  return (
    <div className='rightbar w-[300px] bg-[var(--primary-color)] rounded-xl p-5'>
      {(isLoading)?(
    <div className='sidebar w-[300px] bg-[var(--primary-color)] rounded-xl p-5 h-screen'>
      <Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-[70px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-full h-[20px] rounded-full my-2" />
      <Skeleton className="w-[50px] h-[20px] rounded-full my-2" />

<Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-[70px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-full h-[20px] rounded-full my-2" />
      <Skeleton className="w-[50px] h-[20px] rounded-full my-2" />

      <Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-[70px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-full h-[20px] rounded-full my-2" />
      <Skeleton className="w-[50px] h-[20px] rounded-full my-2" />
      <Skeleton className="w-[100px] h-[20px] rounded-full my-2" />
      
    </div>
  ):(
  <>
  <h2 className='text-[var(--text-color)] font-semibold'>Notifications</h2>
        <span className='text-[var(--text-color)] text-sm'>{notifications.filter((n)=>!n.read).length} unread</span>
        {notifications.length === 0? (
          <div className='text-[var(--text-color)]'>No notifications yet</div>
        ): (
          notifications.map((notification)=>(
            <div key={notification.id} className='py-3 border-t-white border-t'>
                               <p className="text-sm text-[var(--secondary-text)] text-right">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                    {getNotificationIcon(notification.type)}
                    <span className='text-[var(--text-color)]'>{notification.creator.name ?? notification.creator.username}</span>{" "}
                    <span className='text-[var(--secondary-text)]'>
                      {notification.type === "FOLLOW" ? "Started following you" : notification.type === "LIKE" ? " Liked your post" : "Commented on your post!"}
                      </span>
                    

                    {notification.post &&
                      (notification.type === "LIKE" || notification.type === "COMMENT") && (
                        <div className="flex flex-col w-full">
                          <div className="text-sm rounded-md px-2 my-2">
                            <p className='text-[var(--text-color)]'>{notification.post.content}</p>
                            {notification.post.image && (
                              <img
                              src={notification.post.image}
                              alt="Post content"
                              className="mt-2 rounded-md w-full max-w-[130px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {notification.type === "COMMENT" && notification.comment && (
                            <div className="text-sm p-2 bg-[var(--bg-color)] text-[var(--text-color)] rounded-md mb-1 ">
                              {notification.comment.content}
                            </div>
                          )}
                        </div>
                      )}

                </div>
            ))
          )}
          </>
        )}
    </div>
  )
}

export default NotificationBar