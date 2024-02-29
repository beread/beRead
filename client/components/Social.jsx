import React, { useEffect, useState } from 'react';

const Social = () => {
  const [socialItem, setSocialItem] = useState(null);
console.log('allSocial: ', socialItem);


  useEffect(() => {
    const tempSocialItem = [];
fetch (`http:localhost:3000/api/social/getUsers`)
    .then ((response)=> response.json())
    .then((data)=> {
        console.log(data);
        data.forEach((item) => {
            tempFeedItems.push(
                {
                username: username,
                followedUsers: followedUsers,
                followers: followers,
                feed: feed
            }
            )
        })
        setSocialItem(tempSocialItem)
    })
    .catch((err)=> {
        console.log('error in social: ', err)
    })
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      {socialItem.map((socialItem) => (
        <div key={socialItem.id}>{socialItem.name}</div>
      ))}
    </div>
  );
};


export default Social;
