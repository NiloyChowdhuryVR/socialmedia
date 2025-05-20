import prisma from '@/lib/prisma';

// Get all users who follow the given user (followers)
export async function getFollowers(userId: string) {
  try {
    const followers = await prisma.follows.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    // Return only follower user data
    return followers.map(follow => follow.follower);
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("Failed to fetch followers");
  }
}

// Get all users that the given user follows (following)
export async function getFollowing(userId: string) {
  try {
    const following = await prisma.follows.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    // Return only following user data
    return following.map(follow => follow.following);
  } catch (error) {
    console.error("Error fetching following:", error);
    throw new Error("Failed to fetch following");
  }
}
