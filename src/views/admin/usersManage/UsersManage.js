/*
 * @Author: lts
 * @Date: 2021-01-20 10:50:38
 * @LastEditTime: 2021-01-20 12:11:33
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.js
 */
import { ref } from "vue";

const columns = [
    {
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
    },

    {
      title: "学号",
      dataIndex: "stu_id",
      key: "stu_id",
    },
    {
      title: "所属班级",
      key: "class_name",
      dataIndex: "class_name",
      slots: { customRender: "class_name" },
    },
    {
        title: "所属团队",
        dataIndex: "team",
        key: "team",
      },
    {
      title: "操作",
      key: "action",
      slots: { customRender: "action" },
    },
  ];
  
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      stu_id: "1234567",
      class_name:'18级.net2班',
      team:'bar团队'
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      stu_id: "123456",
      class_name:'18级.net2班',
      team:'bar团队'
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      stu_id: "8123456",
      class_name:'18级.net2班',
      team:'bar团队'
    },
  ];

const UsersManage =() => {
    let usersInfo = ref(data)
    return {
        usersInfo,
        columns
    }
}
export default UsersManage