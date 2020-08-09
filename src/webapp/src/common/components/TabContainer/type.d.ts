declare type TabContainerProps = {
  tabConfig: TabConfig[];
  defaultKey: string;
  activeKey?: string;
  onSelect?: any;
};

declare type TabConfig = {
  key: string;
  title: string;
  renderfunction: any;
};
