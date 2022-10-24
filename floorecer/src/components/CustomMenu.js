import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';

const CustomMenu = ({items, visible, openMenu, closeMenu}) => {
  return (
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          {items.map((element, index) => {
            <Menu.Item onPress={element.action} title={element.label} />
          })}
        </Menu>
      </View>
  );
};

export default CustomMenu