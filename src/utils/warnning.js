/*
 * @Author: lts
 * @Date: 2021-01-25 09:07:44
 * @LastEditTime: 2021-01-28 16:50:51
 * @FilePath: \active-center-client\src\utils\warnning.js
 */
import { notification } from 'ant-design-vue';
import { WarningOutlined,CloseCircleOutlined } from '@ant-design/icons-vue';

/**
 * 警告弹框
 * @param {*} title 弹框标题
 * @param {*} message
 */
export default function warnning(title, message) {
  notification.open({
    message: title,
    description: message,
    duration: 2,
    icon: <WarningOutlined style={{ color: '#fadb14' }} />,
  });
}
export  function ErrorNotification(title, message) {
  notification.open({
    message: title,
    description: message,
    duration: 2,
    icon: <CloseCircleOutlined  style={{ color: '#f5222d' }} />,
  });
}
