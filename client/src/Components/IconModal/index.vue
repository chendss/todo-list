<style lang="scss" scope>
.icon-modal-box {
  @include flex();
  align-items: flex-start;
  padding-top: 10vh;
  .modal-contetn {
    $w: 100px;
    .row {
      @include flex();
      .title {
        white-space: nowrap;
        margin-right: 10px;
        width: $w;
        text-align: left;
      }
      .right {
        $h: 900px;
        width: calc(100% - #{$w});
        max-height: $h;
        overflow-y: auto;
        .el-carousel__container {
          height: 500px;
          max-height: $h;
          .el-card {
            overflow-y: auto;
            height: 100%;
            @include flex();
          }
        }
        .add-icon-item {
          cursor: pointer;
          margin-left: 16px;
          margin-bottom: 16px;
          & {
            :hover {
              transform: scale(2);
            }
          }
        }
        .icon-check {
          @keyframes circle {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          animation: circle 1.5s infinite linear;
          transform: scale(1.5);
          i {
            color: $blue;
          }
        }
        .el-card__body {
          padding: 16px 10px 32px 0px;
          flex-wrap: wrap;
          @include flex();
        }
      }
      &:first-child {
        margin-bottom: 10px;
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
  <Dialog title="新增清单"
    @close="modalClose"
    class="icon-modal-box"
    :visible="visible"
    append-to-body>
    <div class="modal-contetn">
      <div class="row">
        <p class="title">请输入清单名称：</p>
        <EleInput class="right"
          v-model="title"></EleInput>
      </div>
      <div class="row">
        <p class="title">请选择icon：</p>
        <Carousel trigger="click"
          class="right"
          :loop="false"
          :interval="30000"
          v-if="get(iconList,'length',0)!==0">
          <CarouselItem v-for="(iconRow, index) in iconList"
            :key="index">
            <Card class="">
              <Icon :icon="itemIcon"
                @click="()=>iconClick(itemIcon)"
                size="32"
                :class="`add-icon-item ${icon===itemIcon?'icon-check':''}`"
                v-for="itemIcon in iconRow"
                :key="itemIcon"></Icon>
            </Card>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <span slot="footer"
      class="icon-modal-footer">
      <Button @click="close">取 消</Button>
      <Button type="primary"
        @click="fine">确 定</Button>
    </span>
  </Dialog>
</template>

<script>
import Icon from "../Icon"
import { chunk } from 'lodash'
import { GET } from '@utils/request.js'
import { get } from "@utils/index.js"
import { Dialog, Button, Input, Card, Carousel, CarouselItem, Message } from "element-ui"

export default {
  components: { Dialog, Button, EleInput: Input, Icon, Card, Carousel, CarouselItem },
  props: ["cancel", "ok", "visible"],
  data () {
    return {
      title: "",
      icons: [],
      icon: null
    }
  },
  computed: {
    iconList () {
      const result = chunk(this.icons, 31 * 9)
      return result
    }
  },
  async mounted () {
    this.title = ''
    this.icon = ''
    const icons = await GET('/icons')
    this.icons = [...new Set(icons)]
  },
  methods: {
    close () {
      this.cancel && this.cancel()
    },
    fine () {
      const { title, icon } = this
      if (get(title, 'length', 0) === 0) {
        Message.error('请输入清单名称')
      } else {
        this.ok && this.ok(title, icon)
        this.cancel && this.cancel()
      }
    },
    modalClose () {
      this.cancel && this.cancel()
    },
    get () {
      return get(...arguments)
    },
    iconClick (icon) {
      this.icon = icon
    }
  }
}
</script>