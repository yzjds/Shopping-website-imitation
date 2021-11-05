<template>
  <div class="spec-preview">
    <img  :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move" ></div>
    <div class="big">
      <img ref='bigImg' :src="defaultImg.imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      defaultIndex: 0,
    };
  },
  props: ["skuImageList"],
  computed: {
    defaultImg() {
      return this.skuImageList[this.defaultIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("changeImg", this.changeImg);
  },
  methods: {
    changeImg(index) {
      this.defaultIndex = index;
    },
    move(event) {
      // 鼠标动，蒙板动   想办法让蒙板跟着动
      // 转化为根据鼠标的位置求蒙板的位置
      // event.clientx   相对视口左上角，视口是不变的
      // event.pageX    相对页面左上角
      // event.offsetX    相对元素本身左上角
      let mask = this.$refs.mask;
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      let maskX = mouseX - mask.clientWidth / 2;
      // 设置蒙板位置之前，把边界限制一下
      if(maskX <0){
        maskX = 0
      }else if(maskX > mask.clientWidth){
        maskX = mask.clientWidth
      }
      let maskY = mouseY - mask.clientHeight / 2;
      if(maskY <0){
        maskY = 0
      }else if(maskY > mask.clientHeight){
        maskY = mask.clientHeight
      }
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";

      // 蒙板动了之后，大图动了
      let bigImg = this.$refs.bigImg;
      bigImg.style.left = -2*maskX +'px';
      bigImg.style.top = -2*maskY +'px';
    },
  },
};
</script>

<style lang="less" >
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>