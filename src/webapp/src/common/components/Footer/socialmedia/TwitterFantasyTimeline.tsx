import React from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import TwitterFooter from './TwitterFooter';

const TwitterFantasyTimeline = (props: TwitterHashtagProps) => {
  return (
    <div>
      <TwitterFooter />
      {!props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          screenName={props.tag || 'IPLFantasy20201'}
          options={{height: 600, width: 600}}
          noHeader
        />
      )}
      {props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          id={props.id}
          borderColor="#03a9f4"
          noHeader
          options={{height: 600, width: 600}}
        />
      )}
    </div>
  );
};

export default TwitterFantasyTimeline;
