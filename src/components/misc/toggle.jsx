import React, { useContext } from 'react';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { ThemeContext } from '../../store/themeContext';

const Toggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <Space direction='vertical'>
      <Switch
        className='custom-switch'
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        defaultChecked
        onChange={handleToggle}
      />
    </Space>
  );
};

export default Toggle;
