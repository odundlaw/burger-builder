import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react';

const TimeAgo = ({time}) => {
    let ago = ""
    if(time){
        const date = parseISO(time);
        const distanceFromNow = formatDistanceToNow(date);
        ago = `Ordered at about ${distanceFromNow} Ago`
    }
  return (
    <span style={{fontSize: '14px', color: "grey"}}>
      <i>{ago}</i>
    </span>
  );
}

export default TimeAgo;
