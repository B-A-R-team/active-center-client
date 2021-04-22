/*
 * @Author: lts
 * @Date: 2021-04-02 17:47:39
 * @LastEditTime: 2021-04-04 21:01:06
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
        title: "权限等级",
        dataIndex: "per_level",
        key: "per_level",
    },
    {
        title: "角色描述",
        dataIndex: "desc",
        key: "desc",
    },
    {
        title: "创建时间",
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: "授权时间",
        key: "updatedAt",
        dataIndex: "updatedAt",
    },
    {
        width: 150,
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
    },
];
const columnsPer = [
    {
        title: '权限',
        dataIndex: "title",
        key: "title",
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
        per_level:'最高等级权限',
        name: '管理员',
        createdAt: '2020-01-12',
        updatedAt: '2021-01-12',
        desc: '管理员权限'
    },
]
const perRules = {
    name: [
        {
            required: true,
            message: "请输入权限",
            trigger: "change",
        },
        {
            min: 1,
            max: 10,
            message: "长度必须在1~10之间",
            trigger: "change",
        },
    ],
    desc: [
        {
            required: true,
            message: "请输入描述",
            trigger: "change",
        },
    ],
};
const roleRules = {
    name: [
        {
            required: true,
            message: "请输入角色",
            trigger: "change",
        },
        {
            min: 1,
            max: 10,
            message: "长度必须在1~10之间",
            trigger: "change",
        },
    ],
    desc: [
        {
            required: true,
            message: "请输入描述",
            trigger: "change",
        },
    ],
};
const dataColmuns = () => {
    const perPagination = ref()
    const perDataSource = ref([])
    const perLoading = ref(false)
    const roleLoading = ref(false)
    onMounted(async () => {
        perLoading.value = true
        const resPer = await axios('/permission')
        if (resPer.code === 200) {
            perPagination.value = {
                total: resPer.data.length,
                pageSize: 6
            }
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
        roleRules,
        perPagination,
        perRules,
        perLoading,
        roleLoading,
        columnsRole,
        columnsPer,
        roleDataSource,
        perDataSource
    }
}
export default dataColmuns;