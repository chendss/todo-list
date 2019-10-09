<style lang="scss">
.icon-modal-box {
  @include flex();
  .modal-contetn {
    .row {
      @include flex();
      .title {
        white-space: nowrap;
        margin-right: 10px;
      }
      .title-input {
        flex: 1 1 auto;
      }
    }
  }
  .icon-modal-footer {
    @include flex();
    justify-content: flex-end;
  }
}
</style>

<template>
  <Dialog title="新增清单" @close="modalClose" class="icon-modal-box" :visible="visible" append-to-body>
    <div class="modal-contetn">
      <div class="row">
        <p class="title">请输入清单名称:</p>
        <EleInput class="title-input" v-model="title"></EleInput>
      </div>
    </div>
    <span slot="footer" class="icon-modal-footer">
      <Button @click="close">取 消</Button>
      <Button type="primary" @click="fine">确 定</Button>
    </span>
  </Dialog>
</template>

<script>
import Icon from "../Icon";
import { get } from "@utils/index.js";
import { Dialog, Button, Input, Tag } from "element-ui";

export default {
  components: { Dialog, Button, EleInput: Input, Tag },
  props: ["cancel", "ok", "visible"],
  data() {
    return {
      title: "",
      icons: []
    };
  },
  mounted() {},
  methods: {
    close() {
      this.cancel();
    },
    fine() {
      this.cancel();
    },
    modalClose() {
      this.cancel();
    }
  }
};
</script>