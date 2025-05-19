"use client"
import { getNotifications, markNotificationsAsRead } from '@/actions/notification.action';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Notifications = Awaited<ReturnType<typeof getNotifications>>;
type Notification = Notifications[number];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <p>LIKED</p>;
    case "COMMENT":
      return <p>commented</p>;
      case "FOLLOW":
          return <p>Followed</p>;
          default:
              return null;
            }
        };

    const page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <p>Loading...</p>;


  return (
    <div>
        <h2>Notifications</h2>
        <span>{notifications.filter((n)=>!n.read).length} unread</span>
        {notifications.length === 0? (
            <div>No notifications yet</div>
        ): (
            notifications.map((notification)=>(
                <div key={notification.id}>
                    {getNotificationIcon(notification.type)}
                    <span>{notification.creator.name ?? notification.creator.username}</span>{" "}
                    {notification.type === "FOLLOW" ? "Started following you" : notification.type === "LIKE" ? " Liked your post" : "Commented on your post!"}
                    

                    {notification.post &&
                      (notification.type === "LIKE" || notification.type === "COMMENT") && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                            <p>{notification.post.content}</p>
                            {notification.post.image && (
                              <img
                                src={notification.post.image}
                                alt="Post content"
                                className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {notification.type === "COMMENT" && notification.comment && (
                            <div className="text-sm p-2 bg-accent/50 rounded-md">
                              {notification.comment.content}
                            </div>
                          )}
                               <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                        </div>
                      )}

                </div>
            ))
        )}
    </div>
  )
}

export default page