<template >
	<div class="users-page">
		<div class="users-page__container">
			<div class="users-page__content">
				<test-users-list :users="users" v-if="!isUserLoading" />
				<div v-else> <test-preloader></test-preloader></div>
				<div class="users-page__btn" v-show="isLastPage"><test-button @click="loadMoreUsers">Showemore</test-button>
				</div>
				<div  class="users-page__pages pagination">
					<div class="pagination__page" :class="{ 'pagination__current-page': page === pageNumber }"
						v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">{{ pageNumber }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import TestUsersList from '@/components/TestUsersList.vue';
import axios from 'axios'
export default {
	components: {
		TestUsersList
	},
	data() {
		return {
			users: [],
			isUserLoading: false,
			selectedSort: '',
			seacherQuery: '',
			page: 1,
			count: 6,
			totalPages: 0,
			isLastPage: true,
		}
	},
	methods: {
		changePage(pageNumber) {
			this.page = pageNumber
			if (this.page == this.totalPages) {
				this.isLastPage = false
			} else {
				this.isLastPage = true
			}
			this.getUsers()
		},
		async getUsers() {
			try {
				this.isUserLoading = true;
				let response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
					params: {
						page: this.page,
						count: this.count
					}
				});
				console.log(response.data.users);
				this.totalPages = Math.ceil(response.data.total_users / this.count)
				this.users = response.data.users;
				this.isUserLoading = false;
			} catch (e) {
				console.log(e);
			} finally {
			}
		},
		async loadMoreUsers() {
			try {
				this.page += 1
				let response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5', {
					params: {
						page: this.page,
						count: this.count
					}
				});
				this.totalPages = Math.ceil(response.data.total_users / this.count)
				this.users = [...this.users, ...response.data.users];
				this.isPostLoading = false;
			} catch (e) {
				console.log(e);
			}
		}
	},
	mounted() {
		this.getUsers()
	}
}
</script>
<style lang="scss">

</style>