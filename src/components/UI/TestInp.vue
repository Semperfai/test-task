<template>
	<input :placeholder="placeholder" class="test-inp" type="text" :value="modelValue" @input="updateInput">
</template>
<script>
export default {
	name: 'test-inp',
	props: {
		modelValue: [String, Number],
		placeholder: [String]
	},
	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>
<style lang="scss">

</style>