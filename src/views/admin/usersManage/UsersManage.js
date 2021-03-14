/*
 * @Author: lts
 * @Date: 2021-01-20 10:50:38
 * @LastEditTime: 2021-03-13 20:29:57
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.js
 */
import axios from "../../../api";
import { ref, onMounted } from "vue";
import { ErrorNotification } from "../../../utils/warnning";

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
const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
    {
      min: 1,
      max: 10,
      message: "长度必须在1~10之间",
      trigger: "blur",
    },
  ],
  class_name: [
    {
      required: true,
      message: "请输入班级名称",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
    
  ],
  stu_id: [
    {
      required: true,
      message: "请输入学号",
      trigger: "change",
    },
    {
      min: 9,
      max: 9,
      message: "长度必须是9位",
      trigger: "blur",
    },
  ],
  team_id: [
    {
      required: true,
      message: '请选择团队',
      trigger: 'change'
    }
  ],
};
const UsersManage = () => {
  let loading = ref(false)
  let usersInfo = ref()
  let pagination = ref()
  onMounted(async () => {
    loading.value = true
    try {
      const res = await axios('/user')
      if (res.code === 200) {
        res.data.forEach((item) => {
          item.key = item.id
        })
        usersInfo.value = res.data
        pagination.value = {
          total: res.data.length,
          pageSize: 9
        }
        loading.value = false
      }
    } catch (error) {
      ErrorNotification('错误', '网络异常')
    }

  })
  return {
    usersInfo,
    columns,
    loading,
    pagination,
    rules
  }
}
export default UsersManage