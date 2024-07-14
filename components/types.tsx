import { NavigationProp, ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  Books: undefined;
  Settings: undefined;
  AddBook: undefined;
};

export type RootDrawerParamList = {
  MainTabs: undefined;
};

export type NavigationProps = NavigationProp<ParamListBase>;