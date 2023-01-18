<template >
	<div class="test-users">
		<div class="test-users__list">
			<test-user-card :user="user" v-for="user in users" :key="user.id" />
		</div>
	</div>
</template>
<script>
import TestUserCard from '@/components/TestUserCard.vue';
export default {
	components: {
		TestUserCard
	},
	props: {
		users: {
			type: Array,
			required: true
		}
	}
}
</script>
<style lang="scss">

</style>