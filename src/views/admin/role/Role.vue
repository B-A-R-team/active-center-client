<!--
 * @Author: lts
 * @Date: 2021-04-02 17:30:42
 * @LastEditTime: 2021-04-04 18:43:57
 * @FilePath: \active-center-client\src\views\admin\role\Role.vue
-->
<template>
  <div style="background: #fff; height: 100%">
    <a-row type="flex" justify="space-between" class="role_per">
      <a-col :sm="24" :md="24" :xl="8">
        <a-card>
          <template #title> 权限列表 </template>
          <template #extra>
            <a-button type="primary" @click="showPerModal">添加权限</a-button>
          </template>
          <a-table
            :dataSource="perDataSource"
            :columns="columnsPer"
            :loading="perLoading"
            :pagination="perPagination"
          >
            <template #action="{ record }">
              <a @click="updatePer(record)">修改权限</a>
            </template>
          </a-table>

          <a-modal
            title="创建权限"
            v-model:visible="perVisible"
            okText="确定"
            cancelText="取消"
            @Ok="handlePerOk"
            @cancel="handlePerCancel"
            :confirm-loading="perConfirmLoading"
          >
            <a-form
              ref="perFormRef"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :model="perFormState"
              :rules="perRules"
            >
              <a-form-item label="权限名称" required name="name">
                <a-input
                  v-model:value="perFormState.name"
                  placeholder="请输入权限名称"
                />
              </a-form-item>
              <a-form-item label="权限描述" name="desc">
                <a-input
                  v-model:value="perFormState.desc"
                  placeholder="请输入权限描述"
                />
              </a-form-item>
              <a-form-item label="选择权限">
                <a-tree
                  checkable
                  defaultExpandAll
                  :tree-data="treeData"
                  v-model:checkedKeys="checkedKeys"
                  @check="check"
                >
                  <template #title0010
                    ><span style="color: #1890ff">sss</span></template
                  >
                </a-tree>
              </a-form-item>
              <p :style="{ color: '#f5222d', marginLeft: '10px' }">
                创建角色时，不能赋予角色权限，需要在下方手动设置。
              </p>
            </a-form>
          </a-modal>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="15">
        <Player />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import dataColunm from "./dataColumn";
import "./role.less";
import axios from "../../../api";
import menuData from "../../../utils/treeData";
import { SuccessNotification } from "../../../utils/warnning";
import Player from "./Player";
export default {
  name: "Role",
  components: {
    Player,
  },
  setup() {
    // table配置项
    const {
      perRules,
      perLoading,
      columnsPer,
      perDataSource,
      perPagination,
    } = dataColunm();
    const perConfirmLoading = ref(false);
    // tree配置项
    const checkedKeys = ref([menuData[0].key]);
    const treeData = ref(menuData);
    const perFormRef = ref(null);
    let perFormState = ref({
      id: null,
      name: "",
      desc: "",
      type: "MENU",
      url: JSON.stringify([
        { key: "/admin/userInfo", title: "个人信息", icon: "UserOutlined" },
      ]),
    });
    const isUpdate = ref(false);
    const perVisible = ref(false);
    const showPerModal = () => {
      perVisible.value = true;
    };
    const updatePer = async (item) => {
      perFormState.value.id = item.id;
      isUpdate.value = true;
      perVisible.value = true;
      perFormState.value.name = item.title;
      perFormState.value.desc = item.desc;
      let myArr = [];
      JSON.parse(item.url).forEach((item) => {
        myArr.push(item.key);
      });
      perFormState.value.url = item.url;
      //   getMenuByKeys(myArr, menuData);
      checkedKeys.value = myArr;
    };
    // const getMenuByKeys = (keys, menuData) => {
    //   const tempArr = [];
    //   keys.forEach((item) => {
    //     menuData.forEach((menuItem) => {
    //       if (!menuItem.children) {
    //         if (item === menuItem.key) {
    //           tempArr.push(menuItem)
    //         }
    //         return
    //       }
    //       if(menuItem.key === item ) {
    //           a
    //       }

    //     });
    //   });
    //   console.log(tempArr)
    // };
    const handlePerOk = () => {
      perFormRef.value
        .validate()
        .then(async () => {
          perConfirmLoading.value = true;
          const { name, desc, url, type, id } = perFormState.value;
          if (!isUpdate.value) {
            const res = await axios.post("/permission", {
              name,
              desc,
              url,
              type,
            });
            if (res.code === 200 && res.data.result) {
              perConfirmLoading.value = false;
              resetFrom();
              SuccessNotification("提示", "添加权限成功");
              const resPer = await axios("/permission");
              if (resPer.code === 200) {
                perPagination.value = {
                  total: resPer.data.length,
                  pageSize: 6,
                };
                resPer.data.forEach((item) => {
                  item.key = item.id;
                  item.title = item.name;
                  delete item.name;
                  delete item.createdAt;
                  delete item.updatedAt;
                });
                perDataSource.value = resPer.data;
              } else {
                console.log("请求出错");
              }
              perVisible.value = false;
            }
            return;
          }
          const res = await axios.put("/permission/" + id, {
            name,
            desc,
            url,
            type,
          });
          if (res.code === 200 && res.data.result) {
            const currentData = perDataSource.value.find(
              (item) => item.id === id
            );
            currentData.title = name;
            currentData.desc = desc;
            currentData.url = url;

            SuccessNotification("提示", "修改权限成功");
          }
          perConfirmLoading.value = false;
          resetFrom();
          perVisible.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const check = (a, e) => {
      let myArr = [];
      e.checkedNodes.forEach((item) => {
        const { key, title, icon } = item.props;
        myArr.push({
          key,
          title,
          icon,
        });
      });
      perFormState.value.url = JSON.stringify(myArr);
    };
    const handlePerCancel = () => {
      resetFrom();
    };
    const resetFrom = () => {
      perFormRef.value.resetFields();
      checkedKeys.value = [menuData[0].key];
    };

    return {
      perPagination,
      handlePerCancel,
      updatePer,
      check,
      checkedKeys,
      perFormRef,
      perFormState,
      perRules,
      perLoading,
      columnsPer,
      perDataSource,
      showPerModal,
      perVisible,
      handlePerOk,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      treeData,
      perConfirmLoading,
    };
  },
};
</script>