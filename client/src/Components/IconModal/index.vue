
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
            <Card class>
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

<style lang="scss" scope src="./iconModal.scss"></style>

<script>
import Icon from "../Icon"
import { chunk } from "lodash"
import { get } from "@utils/index.js"
import { GET } from "@utils/request.js"
import {
  Dialog,
  Button,
  Input,
  Card,
  Carousel,
  CarouselItem,
  Message
} from "element-ui"

let localIcons = []

export default {
  components: {
    Dialog,
    Button,
    EleInput: Input,
    Icon,
    Card,
    Carousel,
    CarouselItem
  },
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
    this.title = ""
    this.icon = ""
    if (localIcons.length !== 0) {
      this.icons = localIcons
    } else {
      const icons = await GET("/icons")
      this.icons = [...new Set(icons)]
      localIcons = this.icons
    }
  },
  methods: {
    close () {
      this.cancel && this.cancel()
    },
    fine () {
      const { title, icon } = this
      if (get(title, "length", 0) === 0) {
        Message.error("请输入清单名称")
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