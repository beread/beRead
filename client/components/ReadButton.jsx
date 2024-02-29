import React from 'react';

const URL = 'http://localhost:3000/api/read/';

async function handleClick(username, timeStarted) {
  const timeFinished = Date.now();
  const timeSpent = timeFinished - timeStarted;

  try {
    await fetch(URL + 'readDailyArticle/' + username, { method: 'PATCH' });
    await fetch(URL + 'updateTimeFinished/' + username, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ timeFinished: timeFinished }),
    });
    await fetch(URL + 'updateTimeSpent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: username, timeSpent: timeSpent }),
    });
  } catch {
    console.log('Error in read button');
  }
}

const readButton = (props) => {
  return (
    <div onClick={() => handleClick(props.username, props.timeStarted)}>
      Read
    </div>
  );
};

export default readButton;
