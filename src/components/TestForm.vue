<template >
	<form v-if="!isLoading" class="test-form">
		<test-inp class="test-form__input" v-model="form.name" placeholder="Your name"></test-inp>
		<div class="errors">
			<span v-for="er, index in errorsName" :key="index">{{ er }}</span>
		</div>
		<test-inp class="test-form__input" v-model="form.email" placeholder="Email"></test-inp>
		<div class="errors">
			<span v-for="er, index in errorsEmail" :key="index">{{ er }}</span>
		</div>
		<test-inp class="test-form__input" v-model="form.phone" placeholder="Phone"></test-inp>
		<div class="errors">
			<span v-for="er, index in errorsPhone" :key="index">{{ er }}</span>
		</div>
		<div class="test-form__options options">
			<p class="options__title">Select your position</p>
			<div v-for="{ name, id } in positions" :key="id" class="options__item">
				<input class="options__input" type="radio" :id="id" name="position" :value="id" v-model="form.picked">
				<label class="options__label" :for="id">{{ name }}</label>
			</div>
		</div>
		<div class="test-form__test-textarea test-textarea">
			<input accept="image/jpeg" ref="fileField" id="file" class="test-textarea__input" type="file" name="uploadFile"
				@change="customFileName" />
			<label class="test-textarea__label" for="file">
				<p class="test-textarea__icon" :class="classValideIcon">Upload</p>
				<span ref="iconErr" class="test-textarea__icon-err" :class="classValideText"
					v-show="!form.validfileType">Failed upload</span>
				<span class="test-textarea__label-text-min" :class="classValideText" v-show="form.fileisLoad">Upload your
					photo</span>
				<p ref="textlabel" class="test-textarea__label-text" :class="classValideLabel">Upload your photo
				</p>
				<span ref="texthelper" class="test-textarea__label-helper-text" :class="classValideText">Please choose
					jpg/jpeg</span>
			</label>
		</div>
		<div class="test-form__btn"><test-button @click.prevent="createUser" :disabled="!isSubmit">Submit</test-button>
			<span ref="errReq"></span>
		</div>
	</form>
	<div v-else><test-preloader></test-preloader></div>
</template>

<script>
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { uaEmail, uaPhone } from '@/functions/validators'
export default {
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			form: {
				name: '',
				email: '',
				phone: '',
				picked: '',
				validfileType: true,
				fileisLoad: false
			},
			positions: [],
			isCreate: false,
			isLoading: false
		}
	},
	validations() {
		return {
			form: {
				name: { required, minLength: minLength(2), maxLength: maxLength(60), $autoDirty: true },
				email: { required, email, minLength: minLength(3), uaEmail: helpers.withMessage('User email, must be a valid email according to RFC2822', uaEmail), $autoDirty: true },
				phone: { required, minLength: minLength(2), maxLength: maxLength(100), uaPhone: helpers.withMessage('Number should start with code of Ukraine +380', uaPhone), $autoDirty: true },
				picked: { required }
			}
		}
	},
	methods: {
		customFileName(event) {
			let url = window.URL || window.webkitURL;
			if (event.target.files && event.target.files[0]) {
				let file, img;
				if ((file = event.target.files[0])) {
					img = new Image();
					img.onload = function () {
						console.log(this.width);
						console.log(this.height);
						if (Number(this.width) < 70 || Number(this.height) < 70) {
							document.querySelector('.test-textarea__label-helper-text').textContent = 'Minimum size of photo 70x70px'
							document.querySelector('.test-textarea__label-helper-text').style.color = '#CB3D40'
						} else {
							document.querySelector('.test-textarea__label-helper-text').textContent = 'The image uploaded'
						}
					}
					img.src = url.createObjectURL(file);
				}
				this.form.fileisLoad = true
				const textContainer = this.$refs.textlabel
				const fileName = event.target.value.split('\\').pop();
				if (textContainer) {
					textContainer.textContent = fileName || 'Upload your photo';
					textContainer.textContent
					if (!textContainer.textContent.includes('.jpg')) {
						this.form.validfileType = false
						this.$refs.texthelper.textContent = 'Incorrect file type'
					} else {
						this.form.validfileType = true
					}
					if (this.$refs.fileField.files[0].size > 5242880) {
						// 5242880 max bytes = 5mb
						this.form.validfileType = false
						this.$refs.texthelper.textContent = 'The photo size must not be greater than 5 Mb.'
					} else {
						this.form.validfileType = true
						this.$refs.texthelper.textContent = 'The image uploaded'
					}

					return true;
				}
			}
			return false;
		},
		async availableUserPosition() {
			let positions = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
				.then(res => res.data.positions);
			this.positions = [...positions]
		},
		async createUser() {
			let id = parseInt(this.form.picked)
			let formData = new FormData()
			formData.append('position_id', id);
			formData.append('name', this.form.name);
			formData.append('email', this.form.email);
			formData.append('phone', this.form.phone);
			formData.append('photo', this.$refs.fileField.files[0]);
			let token;
			await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
				.then(response => response.data)
				.catch(function (error) {
					console.log(error);
				})
				.then((data) => token = data.token);
			try {
				this.isLoading = true
				fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
					method: 'POST',
					body: formData,
					headers: {
						'Token': token
					},
				}).then(response => response.json())
					.then(data => {
						this.isLoading = false
						if (data.success == true) {
							this.isCreate = true
							console.log(this.isCreate)
							this.$emit('isCreateUser', this.isCreate)
						}
					})
			} catch (e) {
				console.log(e);
				this.isLoading = false
			}
		}
	},
	computed: {
		errorsName() {
			let errorsName = []
			for (let item of this.v$.$errors) { if (item.$property == 'name') { errorsName.push(item.$message) } }
			return errorsName
		},
		errorsEmail() {
			let errorsEmail = []
			for (let item of this.v$.$errors) { if (item.$property == 'email') { errorsEmail.push(item.$message) } }
			return errorsEmail
		},
		errorsPhone() {
			let errorsPhone = []
			for (let item of this.v$.$errors) { if (item.$property == 'phone') { errorsPhone.push(item.$message) } }
			return errorsPhone
		},
		classValideIcon() {
			return {
				'test-textarea__icon': this.form.validfileType,
				'err-icon': !this.form.validfileType
			}
		},
		classValideLabel() {
			return {
				'test-textarea__label-text': this.form.validfileType,
				'err-label': !this.form.validfileType
			}
		},
		classValideText() {
			return {
				'test-textarea__label-text-err': !this.form.validfileType
			}
		},
		isSubmit() {
			let isSubmit = false
			if (!this.v$.$silentErrors.length && this.form.validfileType == true && this.form.fileisLoad && this.form.picked && this.$refs.texthelper.textContent !== 'Minimum size of photo 70x70px') {
				isSubmit = true
			}
			return isSubmit
		},
	},
	mounted() {
		this.availableUserPosition()
	}

}

</script>
<style lang="scss">
.test-form {
	display: inline-flex;
	flex-direction: column;

	&__btn {
		display: flex;
		justify-content: center;
	}
}
</style>