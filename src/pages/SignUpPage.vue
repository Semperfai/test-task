<template >
	<div v-if="!updatePage" class="sign-up-page">
		<div class="sign-up-page__container">
			<h1 class="sign-up-page__title">Working with POST request</h1>
			<div class="sign-up-page__content">
				<test-form class="sign-up-page__form" @isCreateUser="UserCreate"></test-form>
			</div>
		</div>
	</div>
	<div v-else class="sign-up-page">
		<div class="sign-up-page__container">
			<h1 class="sign-up-page__title">User successfully registered</h1>
			<div class="sign-up-page__content">
				<img src="@/assets/imgs/success.svg" alt="successfully ">
			</div>
		</div>
	</div>
</template>
<script>
import TestForm from '@/components/TestForm.vue';
export default {
	components: {
		TestForm
	},
	data() {
       return {
		 updatePage: false
	   }
	},
	methods: {
		UserCreate(successUser) {
             this.updatePage = successUser
		}
	}
}
</script>
<style lang="scss">

</style>