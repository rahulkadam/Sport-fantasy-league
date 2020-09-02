import React from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';

const TwitterHashtag = (props: TwitterHashtagProps) => {
  return (
    <div>
      {!props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          screenName={props.tag || 'IPLFantasy20201'}
          options={{height: 600, width: 600}}
        />
      )}
      {props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          id={props.id}
          options={{height: 600, width: 600}}
        />
      )}
    </div>
  );
};

export default TwitterHashtag;
