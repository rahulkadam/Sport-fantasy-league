declare type TabContainerProps = {
  tabConfig: TabConfig[];
  defaultKey: string;
};

declare type TabConfig = {
  key: string;
  title: string;
  renderfunction: any;
};
