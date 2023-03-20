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

</style>
