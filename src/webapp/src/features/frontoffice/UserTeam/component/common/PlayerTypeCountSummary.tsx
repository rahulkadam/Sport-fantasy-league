import React, {Fragment} from 'react';
import {getPlayerMapByType} from '../../redux';
import {PlayerTypeList} from '../../../../../common/components/FantasyDropDown';
import {Badge} from 'react-bootstrap';
const PlayerTypeCountSummary = ({playerList}: PlayerTypeCountSummaryProps) => {
  function renderOverviewByPlayerType(list: any) {
    const badgeArray: any = [];
    const playerMap = getPlayerMapByType(list);
    PlayerTypeList.forEach(item => {
      const count = playerMap.get(item.name);
      if (playerMap.get(item.name)) {
        badgeArray.push(
          <Fragment>
            <Badge pill variant={item.badge}>
              {item.shortName} ({count})
            </Badge>{' '}
          </Fragment>
        );
      }
    });
    return badgeArray;
  }
  return <Fragment>{renderOverviewByPlayerType(playerList)}</Fragment>;
};

export default PlayerTypeCountSummary;
