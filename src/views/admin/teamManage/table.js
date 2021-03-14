/*
 * @Author: lts
 * @Date: 2021-03-13 11:37:06
 * @LastEditTime: 2021-03-13 16:01:33
 * @FilePath: \active-center-client\src\views\admin\teamManage\table.js
 */
/*
 * @Author: lts
 * @Date: 2021-01-20 10:50:38
 * @LastEditTime: 2021-01-20 12:11:33
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.js
 */
import axios from "../../../api";
import { ref, onMounted } from "vue";

const columns = [
    {
        dataIndex: "team_name",
        key: "team_name",
        slots: { title: "customTitle", customRender: "team_name" },
    },
    {
        title: "团队老师",
        key: "team_teacher",
        dataIndex: "team_teacher",
        slots: { customRender: "team_teacher" },
    },
    {
        title: "桌子",
        key: "team_tables",
        dataIndex: "team_tables",
        slots: { customRender: "team_tables" },
    },
    {
        title: "团队人数",
        dataIndex: "people_count",
        key: "people_count",
    },
    {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
    },
];


const Table = () => {
    let teamsInfo = ref([])
    let loading = ref(false)
    let pagination = ref({})
    onMounted(async () => {
        loading.value = true
        const res = await axios('/team')
        if (res.code === 200) {
            res.data.forEach((item) => {
                item.people_count = item.count || 0
                item.key = item.id
                item.team_name = item.name
                item.team_teacher = item.teacher
                item.team_tables = item.tables === null ? [] : JSON.parse(item.tables.replace(/"/g, ""))
                delete item.tables
                delete item.id
                delete item.name
                delete item.teacher
            })
        }
        pagination.value = {
            total: res.data.length,
            pageSize: 6
        }
        teamsInfo.value = res.data
        loading.value = false
    })
    return {
        teamsInfo,
        columns,
        loading,
        pagination
    }
}
export default Table