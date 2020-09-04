import React from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import TwitterFooter from './TwitterFooter';
import './twitter.styles.scss';

const TwitterFantasyTimeline = (props: TwitterHashtagProps) => {
  return (
    <div className="twittertimelineContainer">
      <TwitterFooter />
      {!props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          screenName={props.tag || 'IPLFantasy20201'}
          borderColor="#28a745"
          options={{height: 600, width: 400}}
          noHeader
        />
      )}
      {props.id && (
        <TwitterTimelineEmbed
          sourceType={props.type || 'profile'}
          id={props.id}
          borderColor="#28a745"
          noHeader
          noFooter
          options={{height: 600, width: 400}}
        />
      )}
    </div>
  );
};

export default TwitterFantasyTimeline;
