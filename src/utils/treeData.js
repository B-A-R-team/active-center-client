/*
 * @Author: lts
 * @Date: 2021-04-03 19:53:19
 * @LastEditTime: 2021-04-03 21:42:32
 * @FilePath: \active-center-client\src\utils\treeData.js
 */
const menuData = [
    { key: "/admin/userInfo", title: "个人信息", icon: 'UserOutlined' },
    {
        key: "/admin/signIn",
        title: "签到情况",
        icon: 'PieChartOutlined',
        children: [
            {
                key: "/admin/signIn/personSignIn",
                title: "个人签到情况",
                icon: 'SolutionOutlined',
            },
            {
                key: "/admin/signIn/teamSignIn",
                title: "团队签到情况",
                icon: 'TeamOutlined',
            },
            {
                key: "/admin/signIn/allSignIn",
                title: "活动中心签到情况",
                icon: 'FileTextOutlined',
            },
            {
                key: "/admin/signIn/signInTotal",
                title: "总体签到统计",
                icon: 'CarryOutOutlined',
            },
        ],
    },
    { key: "/admin/usersManage", title: "用户管理", icon: 'TeamOutlined' },
    { key: "/admin/teamManage", title: "团队管理", icon: 'SettingOutlined' },
    { key: "/admin/role", title: "权限管理", icon: 'SettingOutlined' },
]
export default menuData