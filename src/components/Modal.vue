<template>
  <div class="modal">
    <div class="modal__content" @click.prevent>
      <div class="modal__text">
        <slot name="text"></slot>
      </div>
      <div class="modal__btns">
        <slot name="btns"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal'
}
</script>