/*
 * @Author: lts
 * @Date: 2021-04-02 17:47:39
 * @LastEditTime: 2021-04-03 22:28:23
 * @FilePath: \active-center-client\src\views\admin\role\dataColumn.js
 */

import { ref, onMounted } from "vue";
import axios from "../../../api";

const columnsRole = [
    {
        title: '角色名称',
        dataIndex: "name",
        key: "name",
    },
    {
        title: "角色描述",
        dataIndex: "desc",
        key: "desc",
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
    },
    {
        title: "授权时间",
        key: "role_time",
        dataIndex: "role_time",
    },
    {
        width: 250,
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
    },
];
const columnsPer = [
    {
        title: '权限',
        dataIndex: "name",
        key: "name",
    },
    {
        title: "权限描述",
        dataIndex: "desc",
        key: "desc",
    },
    {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
    },
];
const roleDataSource = [
    {
        id: 5,
        key: 5,
        name: '管理员',
        create_time: '2020-01-12',
        role_time: '2021-01-12',
        desc: '管理员权限'
    },
]
const dataColmuns = () => {
    const perDataSource = ref([])
    const perLoading = ref(false)
    const roleLoading = ref(false)
    onMounted(async () => {
        perLoading.value = true
        const resPer = await axios('/permission')
        console.log(resPer)
        if(resPer.code === 200) {
            resPer.data.forEach(item => {
                item.key = item.id
                item.title = item.name
                delete item.name
                delete item.createdAt
                delete item.updatedAt
            })
            perDataSource.value = resPer.data
        } else {
            console.log('请求出错')
        }
        perLoading.value = false

        
    })
    return {
        perLoading,
        roleLoading,
        columnsRole,
        columnsPer,
        roleDataSource,
        perDataSource
    }
}
export default dataColmuns;