<template >
	<div class="wrapper">
		<test-header></test-header>
		<router-view></router-view>
	</div>
</template>
<script>
import TestHeader from '@/components/TestHeader';
export default {
	components: {
		TestHeader
	}
}
</script>
<style lang="scss">

</style>
