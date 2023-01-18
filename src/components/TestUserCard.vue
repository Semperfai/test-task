<template >
	<div class="test-user-card">
		<div @click="$router.push(`/users/${user.id}`)" class="test-user-card__img">
			<img :src="user.photo" alt="photo">
		</div>
		<p class="test-user-card__item_name">{{ user.name }}</p>
		<p class="test-user-card__item">{{ user.position }}</p>
		<p class="test-user-card__item">{{ user.email }}</p>
		<p class="test-user-card__item">{{ user.phone }}</p>
	</div>
</template>
<script>

export default {
	props: {
		user: {
			type: Object,
			required: true,
		}
	}
}
</script>
<style lang="scss">

</style>