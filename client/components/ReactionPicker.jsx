import React from 'react';
import EmojiPicker from 'emoji-picker-react';

function ReactionPicker({ isOpen }) {
  return (
    <EmojiPicker
      style={{
        '--epr-emoji-size': '16px',
        fontSize: '12px',
      }}
      className="reaction-picker"
      width={250}
      height={400}
      open={isOpen}
    />
  );
}

export default ReactionPicker;
