<script lang="ts" setup>
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

let iconName = `#icon-${props.iconClass}`
let svgClass = () => {
  if (props.className) {
    return 'svg-icon'+ ' ' + props.className
  } else {
    return 'svg-icon'
  }
}
// function styleExternalIcon() {
//   return {
//     mask: `url(${props.iconClass}) no-repeat 50% 50%`,
//     '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
//   }
// }
</script>

<template>
  <svg :class="svgClass()" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  fill: currentColor;     /* 关键！让 SVG 填充色等于文字颜色  同时要求svg文件不要填充fill颜色 */
}
</style>
